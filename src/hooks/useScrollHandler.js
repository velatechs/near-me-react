// src/hooks/useScrollHandler.js
import { useState, useEffect } from 'react';

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const useScrollHandler = (refs, threshold = 0.5) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY + window.innerHeight * threshold;

      for (let i = refs.current.length - 1; i >= 0; i--) {
        const element = refs.current[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [refs, threshold]);

  return activeIndex;
};

export default useScrollHandler;