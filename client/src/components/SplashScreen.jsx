import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  // Get the root element to check for dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className={`splash-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="splash-content">
        <h1 className="splash-title">Urban Threads</h1>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
