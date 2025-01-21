import React, { useEffect, useState } from 'react';
import './styles.css';

const LoadingScreen = ({ setLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const completeTimer = setTimeout(() => {
        setLoadingComplete(true);
      }, 1000); // Adjust time to match the fade-out duration

      return () => clearTimeout(completeTimer);
    }, 5000); // Display loading screen for 5 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [setLoadingComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <h1>Phenomenal</h1>
    </div>
  );
};

export default LoadingScreen;
