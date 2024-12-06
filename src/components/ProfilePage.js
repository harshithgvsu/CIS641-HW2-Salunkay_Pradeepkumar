import React, { useState } from 'react';
import '../css/ProfilePage.css';

const ProfilePage = ({ onSubmitProfile, onCancel }) => {
  const [profileData, setProfileData] = useState({
    JobTitle: '',
    Skills: '',
    Education: '',
    Projects:'',
    Experience:''
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitProfile(profileData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          JobTitle:
          <input
            type="text"
            name="JobTitle"
            value={profileData.JobTitle}
            onChange={handleChange}
          />
        </label>
        <label>
          Skills:
          <input
            type="text"
            name="Skills"
            value={profileData.Skills}
            onChange={handleChange}
          />
        </label>
        <label>
          Education:
          <input
            type="Education"
            name="Education"
            value={profileData.Education}
            onChange={handleChange}
          />
        </label>
         <label>
          Projects:
          <input
            type="Projects"
            name="Projects"
            value={profileData.Projects}
            onChange={handleChange}
          />
        </label>
        <label>
          Experience:
          <input
            type="Experience"
            name="Experience"
            value={profileData.Experience}
            onChange={handleChange}
          />
        </label>
        <div className="profile-buttons">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
