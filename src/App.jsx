import  { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import ScrollToTop from "./lib/ScrollToTop";
import MouseFollower from "mouse-follower";
import gsap from "gsap";
import routes from "./routes/router";
import Preloader from "./components/app/preloader";
MouseFollower.registerGSAP(gsap);

function App() {
  const routing = useRoutes(routes);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime + 10000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const getPerformance = () => {
    const endTime = window.performance.now();
    const timeToRender = endTime - startTime;
    setLoadingTime(timeToRender);
  };

  useEffect(() => {
    setStartTime(window.performance.now());
    if (!isLoading) {
      getPerformance();
    }
    console.log(loadingTime);
  }, [isLoading]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoading]);

  useEffect(() => {
    if (!isMobile) {
      const cursor = new MouseFollower();
      cursor.init();

      return () => {
        cursor.destroy();
      };
    }
  }, [isMobile]);

  return (
    <>
      {isLoading && <Preloader loadingTime={loadingTime + 10000} />}
      <ScrollToTop>{routing}</ScrollToTop>
    </>
  );
}

export default App;
