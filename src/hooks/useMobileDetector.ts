import { useEffect, useState } from "react";
import { MOBILE_THRESHOLD } from "../constants/breakpoints";

/**
 * Hook to determine if the screen size is mobile
 */
const useMobileDetector = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_THRESHOLD)

  useEffect(() => {

    const resizeHandler = () => {
      setIsMobile(window.innerWidth <= MOBILE_THRESHOLD);
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    }
  }, [])

  return isMobile;
}

export default useMobileDetector;