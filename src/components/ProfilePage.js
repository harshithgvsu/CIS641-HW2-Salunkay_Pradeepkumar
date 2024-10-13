import React, { useState } from 'react';
import '../css/ProfilePage.css';

const ProfilePage = ({ onSubmitProfile }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [projects, setProjects] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      jobTitle,
      skills,
      education,
      projects,
      experience,
    };
    onSubmitProfile(profileData);
  };

  return (
    <div className="profilePage">
      <h2>Enter Your Profile Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label>Skills:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label>Education:</label>
          <input
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label>Projects:</label>
          <input
            type="text"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label>Experience:</label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfilePage;
