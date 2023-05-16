import { useEffect, useState } from 'react';
export const generateImageName = (str) => {
    const strSplit = str.split(".");
    return strSplit[0];
  };
  
export default function formatDateFromSequelize(date) {
  const jsDate = new Date(date);

  // Format the date using the toLocaleDateString() method with custom options
  const formattedDate = jsDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Replace slashes (/) with dashes (-)
  const formattedDateWithDashes = formattedDate.replace(/\//g, '-');

  return formattedDateWithDashes;
  }



  export function useMobileView() {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const mobileMaxWidth = 767; // Adjust this threshold to your needs
  
      const handleResize = () => {
        setIsMobile(window.innerWidth <= mobileMaxWidth);
      };
  
      // Attach the event listener
      window.addEventListener('resize', handleResize);
  
      // Call the handler initially to set the initial isMobile value
      handleResize();
  
      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return isMobile;
  }