import React, { useState } from 'react';
import SwipeableCard from './SwipeableCard';
import '../css/SwipeableDeck.css';

const SwipeableDeck = ({ jobs, userEmail }) => {
  const [currentJobs, setCurrentJobs] = useState(jobs || []);
  const [likedJobs, setLikedJobs] = useState([]);
  const [dislikedJobs, setDislikedJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);
  const [resumeError, setResumeError] = useState(null);

  const handleSwipeLeft = (jobId) => {
    setDislikedJobs((prev) => [...prev, jobId]);
    setCurrentJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const handleSwipeRight = async (jobId) => {
    const jobDetails = currentJobs.find((job) => job.id === jobId);
    if (!jobDetails) return;

    setLoadingResume(true);
    setResumeError(null);

    try {
      const response = await fetch('http://localhost:5002/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job: jobDetails, email: userEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setResume(data.resume);
      } else {
        throw new Error(data.error || 'Failed to generate resume');
      }
    } catch (err) {
      setResumeError('Failed to generate resume. Please try again.');
    } finally {
      setLoadingResume(false);
    }

    setCurrentJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  return (
    <div className="swipeableDeck">
      {resume && (
        <div className="resumeModal">
          <h2>Generated Resume</h2>
          <pre>{resume}</pre>
          <button onClick={() => setResume(null)}>Close</button>
        </div>
      )}

      {loadingResume && <div className="loading">Generating Resume...</div>}
      {resumeError && <div className="error">{resumeError}</div>}

      {currentJobs.map((job) => (
        <SwipeableCard
          key={job.id}
          job={job}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      ))}

      {!currentJobs.length && (
        <div className="endMessage">
          <h2><center>No more jobs</center></h2>
          <p><center>You've reached the end of the job listings.</center></p>
        </div>
      )}
    </div>
  );
};

export default SwipeableDeck;
