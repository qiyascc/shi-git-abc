import { Outlet } from "react-router-dom";
import Navbar from "../app/navbar";
import { useEffect, useRef, useState } from "react";
import Footer from "../app/footer";
import { ReactLenis } from "lenis/react";

const MainLayout = () => {
  const [atFooter, setAtFooter] = useState(false);
  const footerRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const fullHeight = document.documentElement.scrollHeight;
    const footerHeight = footerRef.current.clientHeight;
    const windowHeight = window.innerHeight;

    if (scrollTop + footerHeight >= fullHeight - windowHeight) {
      setAtFooter(true);
    } else {
      setAtFooter(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ReactLenis root>
        <Navbar show={atFooter} />
        <main>
          <Outlet />
        </main>
        <Footer ref={footerRef} />
      </ReactLenis>
    </>
  );
};

export default MainLayout;
