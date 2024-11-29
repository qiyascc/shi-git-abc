import LogoWhite from "@/assets/LogoWhite";
import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.scss";
import LogoBlack from "@/assets/LogoBlack";
import Dropdown from "@/components/ui/Dropdown";
import AnimatedButton from "@/components/ui/animatedButton";
import { useEffect } from "react";
import gsap from "gsap";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(`.${styles.logo_container}`, {
      translateY: "0",
      opacity: 1,
      duration: 1,
      ease: "power1.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <header
      className={`flex items-start justify-between z-30 
      ${location.pathname === "/" && styles.home_header} 
      ${location.pathname !== "/" && styles.header}`}
      
    >
      <Link to="/" className={`${styles.logo_container}`}>
        {location.pathname === "/" ? <LogoWhite /> : <LogoBlack />}
      </Link>

      <div className="relative">
        <Dropdown
          variant={`${location.pathname === "/" ? "white" : "black"}`}
        />
        
          <AnimatedButton
            text=" Let's talk"
            mode={`${location.pathname === "/" ? "light" : "dark"}`}
            className={`${
              location.pathname === "/"
                ? "bg-white text-primary border-none"
                : "border border-primary"
            }`}
            link="/contact"
          ></AnimatedButton>
      </div>
    </header>
  );
};

export default Header;
