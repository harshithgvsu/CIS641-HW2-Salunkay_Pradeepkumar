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
