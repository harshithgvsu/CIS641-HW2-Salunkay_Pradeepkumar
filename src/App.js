import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SwipeableDeck from './components/SwipeableDeck';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import ErrorBoundary from './components/ErrorBoundary';
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

  // Handle user login
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', {
        username: email,
        password,
      });
      setUsername(response.data.username || email);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Error during login:', err.response?.data || err.message);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      const response = await axios.post('http://localhost:5002/api/auth/register', {
        username: name,
        email,
        password,
      });
      setUsername(response.data.username || email);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Error during registration:', err.response?.data || err.message);
    }
  };

  // Fetch jobs after login and profile completion
  useEffect(() => {
    if (isLoggedIn && profileCompleted) {
      const fetchJobs = async () => {
        try {
          setLoadingJobs(true);
          const requestBody = { keywords: 'software developer', location: 'remote' };
          const response = await axios.post('http://localhost:5002/api/jobs', requestBody);
          setJobs(response.data);
        } catch (err) {
          console.error('Error fetching jobs:', err.message);
          setError('Failed to load jobs');
        } finally {
          setLoadingJobs(false);
        }
      };
      fetchJobs();
    }
  }, [isLoggedIn, profileCompleted]);

  const handleProfileSave = (profileData) => {
    if (!profileData || Object.values(profileData).some((val) => !val)) {
      console.error('Incomplete profile data:', profileData);
      return;
    }
    setProfileCompleted(true);
    setIsEditingProfile(false);
    handleProfileUpdate(username, profileData);
  };

  // Handle profile update
  const handleProfileUpdate = async (username, profileData) => {
    try {
      const response = await axios.put('http://localhost:5002/api/user/profile', {
        username,
        profileData,
      });
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
    }
  };

  const handleProfileEdit = () => setIsEditingProfile(true);
  const handleCancelEdit = () => setIsEditingProfile(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileCompleted(false);
    setIsEditingProfile(false);
    setUsername('');
  };

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
            <ProfilePage
              onSubmitProfile={handleProfileSave}
              onCancel={handleCancelEdit}
            />
          ) : loadingJobs ? (
            <div>Loading jobs...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <SwipeableDeck jobs={jobs} userEmail={username} />
          )
        ) : (
          <Login
            onLogin={handleLogin}
            onRegister={handleRegister}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
