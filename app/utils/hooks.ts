import { useEffect, useState } from "react";

export function useScrollButtonVisibility() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScrollButtonVisiblity = () => {
        window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
      };
      window.addEventListener("scroll", handleScrollButtonVisiblity);
      return () => {
        window.removeEventListener("scroll", handleScrollButtonVisiblity);
      };
    }
  }, []); // Empty array ensures that effect is only run on mount
  return showButton;
}

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
};

export function useWindowDimensions() {
  const [windowDimensions, setWindowSize] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowDimensions;
}
