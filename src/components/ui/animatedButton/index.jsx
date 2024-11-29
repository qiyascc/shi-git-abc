import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import styles from "./animatedButton.module.scss";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const AnimatedButton = ({
  link,
  text,
  mode = "light",
  className,
  type = "button",
  animation = true,
}) => {
  const Wrapper = link ? Link : "div";
  const elementRef = useRef();

  useEffect(() => {
    if (animation) {

      const el = elementRef.current;

      gsap.to(el, {
        translateY: "0",
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      });

      return () => {
        if (el && el.scrollTrigger) {
          el.scrollTrigger.kill();
        }
      };
    }
  }, [animation]);
  return (
    <Wrapper
      to={link ? link : undefined}
      className={`${styles.animatedButton} ${
        mode === "dark" ? styles.dark : ""
      } ${className} ${animation ? styles.animate : ""}`}
      ref={elementRef}
      data-cursor={mode !== "dark" ? "-inverse" : ""}
    >
      <div className={`relative ${mode == "dark" ? "bg-primary" : ""}`}>
        <Button
          type={type}
          variant={mode === "light" ? "primary" : "secondary"}
        >
          {text}
        </Button>
      </div>
      <span className={`${styles["one"]}`}></span>
      <span className={`${styles["two"]}`}></span>
      <span className={`${styles["three"]}`}></span>
    </Wrapper>
  );
};

AnimatedButton.propTypes = {
  mode: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  animation: PropTypes.bool,
};

export default AnimatedButton;
