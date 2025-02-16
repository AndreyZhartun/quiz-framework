import { useEffect, useState } from "react";

const MOBILE_THRESHOLD = 768;

/**
 * Хук для определения, показывается ли интерфейс на мобильных
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