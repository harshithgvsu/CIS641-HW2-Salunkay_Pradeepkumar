// // src/App.js
// import React from 'react';
// import SwipeableDeck from './components/SwipeableDeck';
// import jobs from './data/jobs';
// import ErrorBoundary from './components/ErrorBoundary';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>JobSwipe</h1>
//         <p>Swipe right to apply, left to skip</p>
//       </header>
//       <ErrorBoundary>
//         <SwipeableDeck jobs={jobs} />
//       </ErrorBoundary>
//     </div>
//   );
// }

// export default App;

// -----------------------------working
import React, { useState } from 'react';
import SwipeableDeck from './components/SwipeableDeck';
import Login from './components/Login';
import jobs from './data/jobs';
import ErrorBoundary from './components/ErrorBoundary';
import './css/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleProfileSave = (profileData) => {
    console.log('Profile Saved:', profileData);
    setProfileCompleted(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Future Board</h1>
        <p>Swipe right and left to play your future</p>
      </header>
      <ErrorBoundary>
        {isLoggedIn ? (
          <SwipeableDeck jobs={jobs} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import SwipeableDeck from './components/SwipeableDeck';
// import jobs from './data/jobs';
// import ErrorBoundary from './components/ErrorBoundary';
// import ProfilePage from './components/ProfilePage'; // Import Profile Page
// import './css/App.css';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profileComplete, setProfileComplete] = useState(false); // Track if profile is completed
//   const [profileData, setProfileData] = useState(null); // Store profile data

//   const handleLogin = () => {
//     setIsLoggedIn(true); // Set logged in state
//   };

//   const handleProfileSubmit = (data) => {
//     setProfileData(data);
//     setProfileComplete(true); // Set profile as complete after submission
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>JobSwipe</h1>
//         <p>Swipe right to apply, left to skip</p>
//       </header>
//       <ErrorBoundary>
//         {/* Conditionally render profile page if the user hasn't completed it */}
//         {!profileComplete && isLoggedIn ? (
//           <ProfilePage onSubmitProfile={handleProfileSubmit} />
//         ) : (
//           <>
//             {isLoggedIn && profileComplete && (
//               <div className="profileTab">
//                 <h2>Your Profile</h2>
//                 <p><strong>Job Title:</strong> {profileData.jobTitle}</p>
//                 <p><strong>Skills:</strong> {profileData.skills}</p>
//                 <p><strong>Education:</strong> {profileData.education}</p>
//                 <p><strong>Projects:</strong> {profileData.projects}</p>
//                 <p><strong>Experience:</strong> {profileData.experience}</p>
//               </div>
//             )}
//             <SwipeableDeck jobs={jobs} />
//           </>
//         )}
//       </ErrorBoundary>
//     </div>
//   );
// }
// 
// export default App;
