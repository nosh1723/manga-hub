import { useState, useEffect } from 'react';

interface WindowSize {
  desktop: boolean;
  laptop: boolean;
  laptop_l: boolean;
  tablet: boolean;
  mobile: boolean;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    desktop: false,
    laptop: false,
    laptop_l: false,
    tablet: false,
    mobile: false,
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      setWindowSize({
        mobile: width < 768,
        tablet: width >= 768 && width < 1024,
        laptop: width >= 1024 && width < 1440,
        laptop_l: width >= 1440 && width < 1920,
        desktop: width >= 1920,
      });
      
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

export default useWindowSize;
