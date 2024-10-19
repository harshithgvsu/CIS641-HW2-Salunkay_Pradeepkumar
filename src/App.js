import React, { useState } from 'react';
import SwipeableDeck from './components/SwipeableDeck';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import jobs from './data/jobs';
import ErrorBoundary from './components/ErrorBoundary';
import './css/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleProfileSave = (profileData) => {
    console.log('Profile Saved:', profileData);
    setProfileCompleted(true);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Future Board</h1>
        <p>Swipe right and left to play your future</p>
        {isLoggedIn && (
          <button
            className="profile-icon-button"
            onClick={handleProfileEdit}
          >
            <i className="fas fa-user"></i>
          </button>
        )}
      </header>
      <ErrorBoundary>
        {isLoggedIn ? (
          isEditingProfile || !profileCompleted ? (
            <ProfilePage onSubmitProfile={handleProfileSave} onCancel={handleCancelEdit}/>
          ) : (
            <SwipeableDeck jobs={jobs} />
          )
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;