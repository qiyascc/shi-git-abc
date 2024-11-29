import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

gsap.registerPlugin(ScrollTrigger);

const AnimateElement = ({ 
  children,
  className = "translate-y-24",
  duration = 1,
}) => {
  const elementRef = useRef();

  useEffect(() => {
    const el = elementRef.current;

    gsap.to(el, {
      translateY: "0",
      opacity: 1,
      duration,
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
  }, [duration]);
  return (
    <div ref={elementRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};

AnimateElement.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  duration: PropTypes.number,
};

export default AnimateElement;
