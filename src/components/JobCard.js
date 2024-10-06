// src/components/JobCard.js
import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  if (!job) {
    return null; // Prevent rendering if job is undefined
  }

  return (
    <div className="jobCard">
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <p>{job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
    </div>
  );
};

export default JobCard;
