// src/components/SwipeableCard.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import JobCard from './JobCard';
import './SwipeableCard.css';

const SwipeableCard = ({ job, onSwipeLeft, onSwipeRight }) => {
  // Configure useSpring with all necessary animated properties
  const [props, set] = useSpring(() => ({
    from: { opacity: 0, x: 0, rot: 0, scale: 0.95 },
    to: { opacity: 1, x: 0, rot: 0, scale: 1 },
    config: { tension: 300, friction: 30 },
  }));

  // Handle swipe left action
  const handleSwipeLeft = () => {
    set({
      x: -window.innerWidth, // Move left off-screen
      rot: -20, // Rotate counter-clockwise
      scale: 1,
      opacity: 0,
      onRest: () => onSwipeLeft(job.id), // Trigger callback after animation
    });
  };

  // Handle swipe right action
  const handleSwipeRight = () => {
    set({
      x: window.innerWidth, // Move right off-screen
      rot: 20, // Rotate clockwise
      scale: 1,
      opacity: 0,
      onRest: () => onSwipeRight(job.id), // Trigger callback after animation
    });
  };

  // Set up swipe handlers using react-swipeable
  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <animated.div
      {...handlers}
      className="swipeableCard"
      style={{
        transform: props.x
          .to((x) => `translateX(${x}px) rotate(${props.rot}deg) scale(${props.scale})`),
        opacity: props.opacity,
      }}
    >
      <JobCard job={job} />
    </animated.div>
  );
};

export default SwipeableCard;
