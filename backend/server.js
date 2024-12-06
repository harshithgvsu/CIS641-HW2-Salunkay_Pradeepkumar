const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const User = require('./models/user')
require('dotenv').config();

const PORT = process.env.PORT || 5002;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const dbURI = process.env.MONGO_URI;
const OPENAI_KEY = process.env.OPEN_API_KEY;

mongoose.connect(dbURI || 'mongodb://localhost:27017/Job-Board', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Connection error', error));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', profileRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/api/jobs', async (req, res) => {
  try {
    const { keywords, location } = req.body;
    const apiUrl = `${API_URL}${API_KEY}`;
    const response = await axios.post(apiUrl, {
      keywords,
      location
    });

    const jobs = response.data.jobs;

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs from Jooble:', error.message);
    res.status(500).json({ error: 'Failed to fetch job data from Jooble' });
  }
});

app.post('/api/generate-resume', async (req, res) => {
  const { job, email } = req.body;
  try {
    const user = await User.findOne({ email }); // Ensure `email` is unique in your schema
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const profileData = user.profile || {};

    const prompt = `
      Generate a professional resume tailored for the following job:
      Job Title: ${job.title}
      Company: ${job.company}
      Location: ${job.location}
      Description: ${job.description}

      Include the following user details:
      Name: ${user.userName}
      Email: ${user.email}
      Skills: ${profileData.Skills || 'Not provided'}
      Experience: ${profileData.Experience || 'Not provided'}
      Education: ${profileData.Education || 'Not provided'}
    `;
    const openAIResponse = await axios.post('https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a professional resume generator.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1500,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log('OpenAI Response:', openAIResponse.data);
    const generatedResume = openAIResponse.data.choices[0].message.content
    // if (email) {
    //   const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //       user: process.env.EMAIL_USER || 'vikingadam23@gmail.com',
    //       pass: process.env.EMAIL_PASS || 'Viking@Csu',
    //     }
    //   });
    //   const mailOptions = {
    //     from: '"Job Application" <salunkah@mail.gvsu.edu>',
    //     to: email,
    //     subject: 'Thank you for Applying!',
    //     text: `Dear ${user.userName},\n\nThank you for applying for the position of ${job.title} at ${job.company}. We have received your application and will get back to you shortly.\n\nBest regards,\n[Harshith]`,
    //   };
    //   await transporter.sendMail(mailOptions);
    //   console.log('email sent successfully');
    // }
    res.status(200).json({ resume: generatedResume, message: 'Resume generated and email sent.' });
  } catch (err) {
    console.error('Error generating resume:', err.message);
    console.error('Error from OpenAI:', err.response?.data)
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});
