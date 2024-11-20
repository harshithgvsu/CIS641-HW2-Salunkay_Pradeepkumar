const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
require('dotenv').config();

const PORT = process.env.PORT || 5002;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const dbURI = process.env.MONGO_URI;

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
