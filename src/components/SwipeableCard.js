// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSpring, animated } from 'react-spring';
// import { useSwipeable } from 'react-swipeable';
// import JobCard from './JobCard';
// import '../css/SwipeableCard.css';

// const SwipeableCard = ({ job, onSwipeLeft, onSwipeRight, showResume }) => {
//   const [swipeDirection, setSwipeDirection] = useState(null);

//   // Configure useSpring with the api object
//   const [props, api] = useSpring(() => ({
//     from: { opacity: 0, x: 0, rot: 0, scale: 0.95 },
//     to: { opacity: 1, x: 0, rot: 0, scale: 1 },
//     config: { tension: 300, friction: 30 },
//   }));

//   // Handle swipe left action
//   const handleSwipeLeft = () => {
//     setSwipeDirection('left');
//     api.start({
//       x: -window.innerWidth,
//       rot: -20,
//       scale: 1,
//       opacity: 0,
//       onRest: () => {
//         onSwipeLeft(job.id);
//         setSwipeDirection(null);
//       },
//     });
//   };

//   // Handle swipe right action
//   const handleSwipeRight = async (jobId, email) => {
//     setSwipeDirection('right');
//     const jobDetails = currentJobs.find((job) => job.id === jobId);
//     if(!jobDetails) return

//     try {
//       const response = await axios.post('http://localhost:5002/api/generate-resume', {
//         job: jobDetails,
//         email: email
//       });
//       console.log('Generated Resume:', response.data.resume);
//       showResume(response.data.resume);
//     } catch (err) {
//       console.error('Error generating resume:', err.message);
//     }

//     api.start({
//       x: window.innerWidth,
//       rot: 20,
//       scale: 1,
//       opacity: 0,
//       onRest: () => {
//         onSwipeRight(job.id, email);
//         setSwipeDirection(null);
//       },
//     });
//   };

//   // Set up swipe handlers using react-swipeable
//   const handlers = useSwipeable({
//     onSwipedLeft: handleSwipeLeft,
//     onSwipedRight: handleSwipeRight,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   return (
//     <animated.div
//       {...handlers}
//       className={`swipeableCard ${swipeDirection === 'left' ? 'swipingLeft' : ''} ${swipeDirection === 'right' ? 'swipingRight' : ''}`}
//       style={{
//         transform: props.x
//           .to((x) => `translateX(${x}px) rotate(${props.rot}deg) scale(${props.scale})`),
//         opacity: props.opacity,
//       }}
//     >
//       {/* Tick and X mark depending on swipe direction */}
//       {swipeDirection === 'right' && (
//         <div className="swipeIcon tickIcon">✔️</div>
//       )}
//       {swipeDirection === 'left' && (
//         <div className="swipeIcon crossIcon">❌</div>
//       )}

//       <JobCard job={job} />
//     </animated.div>
//   );
// };

// export default SwipeableCard;


import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import '../css/SwipeableCard.css';

const SwipeableCard = ({ job, onSwipeLeft, onSwipeRight }) => {
  const [swipeDirection, setSwipeDirection] = useState(null);

  const [props, api] = useSpring(() => ({
    from: { opacity: 0, x: 0, rot: 0, scale: 0.95 },
    to: { opacity: 1, x: 0, rot: 0, scale: 1 },
    config: { tension: 300, friction: 30 },
  }));

  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    api.start({
      x: -window.innerWidth,
      rot: -20,
      scale: 1,
      opacity: 0,
      onRest: () => {
        onSwipeLeft(job.id);
        setSwipeDirection(null);
      },
    });
  };

  const handleSwipeRight = () => {
    setSwipeDirection('right');
    onSwipeRight(job.id);
    api.start({
      x: window.innerWidth,
      rot: 20,
      scale: 1,
      opacity: 0,
      onRest: () => {
        setSwipeDirection(null);
      },
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <animated.div
      {...handlers}
      className={`swipeableCard ${swipeDirection === 'left' ? 'swipingLeft' : ''} ${swipeDirection === 'right' ? 'swipingRight' : ''}`}
      style={{
        transform: props.x
          .to((x) => `translateX(${x}px) rotate(${props.rot}deg) scale(${props.scale})`),
        opacity: props.opacity,
      }}
    >
      {swipeDirection === 'right' && <div className="swipeIcon tickIcon">✔️</div>}
      {swipeDirection === 'left' && <div className="swipeIcon crossIcon">❌</div>}
      <div className="jobDetails">
        <h3>{job.title}</h3>
        <p>{job.company}</p>
        <p>Location: {job.location}</p>
      </div>
    </animated.div>
  );
};

export default SwipeableCard;
