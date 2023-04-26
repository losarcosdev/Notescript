import { useState, useEffect } from "react";

// Custom hook for resizing the width of an element based on window size
export const useResizable = () => {
  // State to store the current inner height of the window
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  // State to store the current inner width of the window
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  // State to store the current width of the element
  const [width, setWidth] = useState(window.innerWidth * 0.5);

  // Effect to listen for window resize events and update state accordingly
  useEffect(() => {
    // Timer to throttle the number of events being triggered
    let timer: any;

    // Function to handle the resize event
    const listener = () => {
      // Clear previous timer
      if (timer) {
        clearTimeout(timer);
      }

      // Set new timer for 100ms
      timer = setTimeout(() => {
        // Update inner height and width state
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        // If the new window width * 0.5 is less than the current width,
        // update the width state to be the new window width * 0.5
        if (window.innerWidth * 0.5 < width) {
          setWidth(window.innerWidth * 0.5);
        }
      }, 100);
    };

    // Add the listener function to the resize event
    window.addEventListener("resize", listener);

    // Return a cleanup function to remove the resize event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  // Return the inner height, inner width, current width, and setWidth function
  return {
    innerHeight,
    innerWidth,
    width,
    setWidth,
  };
};
