// src/components/SwipeableDeck.js
import React, { useState } from 'react';
import SwipeableCard from './SwipeableCard';
import './SwipeableDeck.css';

const SwipeableDeck = ({ jobs }) => {
  const [currentJobs, setCurrentJobs] = useState(jobs || []);
  const [likedJobs, setLikedJobs] = useState([]);
  const [dislikedJobs, setDislikedJobs] = useState([]);

  const handleSwipeLeft = (jobId) => {
    setDislikedJobs((prev) => [...prev, jobId]);
    console.log(`Disliked job ID: ${jobId}`);
    setCurrentJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const handleSwipeRight = (jobId) => {
    setLikedJobs((prev) => [...prev, jobId]);
    console.log(`Liked job ID: ${jobId}`);
    setCurrentJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  if (!currentJobs || currentJobs.length === 0) {
    return (
      <div className="endMessage">
        <h2><center>No more jobs</center></h2>
        <p>You've reached the end of the job listings.</p>
      </div>
    );
  }

  return (
    <div className="swipeableDeck">
      {currentJobs.map((job) => (
        <SwipeableCard
          key={job.id}
          job={job}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      ))}
    </div>
  );
};

export default SwipeableDeck;
