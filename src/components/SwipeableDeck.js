// src/components/SwipeableDeck.js
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import JobCard from './JobCard';
import './SwipeableDeck.css';

const SwipeableDeck = ({ jobs }) => {
  const [currentJobs, setCurrentJobs] = useState(jobs || []);
  const [likedJobs, setLikedJobs] = useState([]);
  const [dislikedJobs, setDislikedJobs] = useState([]);

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      console.error('No jobs data provided to SwipeableDeck.');
    }
  }, [jobs]);

  const swiped = (direction, jobId) => {
    if (direction === 'right') {
      setLikedJobs((prev) => [...prev, jobId]);
      console.log(`Liked job ID: ${jobId}`);
    } else if (direction === 'left') {
      setDislikedJobs((prev) => [...prev, jobId]);
      console.log(`Disliked job ID: ${jobId}`);
    }
    setCurrentJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const outOfFrame = (jobTitle) => {
    console.log(`${jobTitle} left the screen!`);
  };

  if (!currentJobs || currentJobs.length === 0) {
    return (
      <div className="endMessage">
        <h2>No more jobs</h2>
        <p>You've reached the end of the job listings.</p>
      </div>
    );
  }

  return (
    <div className="swipeableDeck">
      {currentJobs.map((job) => (
        <TinderCard
          className="swipe"
          key={job.id}
          onSwipe={(dir) => swiped(dir, job.id)}
          onCardLeftScreen={() => outOfFrame(job.title)}
          preventSwipe={['up', 'down']}
        >
          <JobCard job={job} />
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeableDeck;
