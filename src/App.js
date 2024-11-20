import React, { useState, useEffect } from 'react';
import SwipeableDeck from './components/SwipeableDeck';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import ErrorBoundary from './components/ErrorBoundary';
import axios from 'axios';
import './css/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle login after user registers or logs in
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log('User logged in');
  };

  // Register user
  const handleRegister = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      // const response = await axios.post('http://localhost:5002/api/auth/register', { username, password });

      console.log('Registration successful:', response.data);
      handleLogin();
    } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
        console.log('inside catch')
    }
  };

  // Update user profile
  const handleProfileUpdate = async (username, profileData) => {
    try {
      const response = await axios.post('/api/user/profile', {
        username: username,
        profileData
      });
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }
  };

  // Save the profile and update state
  const handleProfileSave = (profileData) => {
    console.log('Profile Saved:', profileData);
    setProfileCompleted(true);
    setIsEditingProfile(false);
    handleProfileUpdate(username, profileData);  // Pass the username here
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileCompleted(false);
    setIsEditingProfile(false);
    setUsername('');
  };

  // Fetch jobs from the server when logged in and profile is complete
  useEffect(() => {
    if (isLoggedIn && profileCompleted) {
      const fetchJobs = async () => {
        try {
          setLoadingJobs(true);

          const requestBody = {
            keywords: 'software developer',
            location: 'remote',
          };

          const response = await axios.post('http://localhost:5002/api/jobs', requestBody);
          setJobs(response.data);
          setLoadingJobs(false);
        } catch (error) {
          console.error('Error fetching jobs:', error);
          setError('Failed to load jobs');
          setLoadingJobs(false);
        }
      };

      fetchJobs();
    }
  }, [isLoggedIn, profileCompleted]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-text">
          <h1>Future Board</h1>
          <p>Swipe right and left to play your future</p>
        </div>
        {isLoggedIn && (
          <div className="header-icons">
            <button className="profile-icon-button" onClick={handleProfileEdit}>
              <i className="fas fa-user"></i>
            </button>
            <button className="logout-icon-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        )}
      </header>
      <ErrorBoundary>
        {isLoggedIn ? (
          isEditingProfile || !profileCompleted ? (
            <ProfilePage onSubmitProfile={handleProfileSave} onCancel={handleCancelEdit} />
          ) : loadingJobs ? (
            <div>Loading jobs...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <SwipeableDeck jobs={jobs} />
          )
        ) : (
          <Login onLogin={handleLogin} onRegister={handleRegister} setUsername={setUsername} setPassword={setPassword} />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
