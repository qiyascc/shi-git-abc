import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const AnimateWords = ({
  text,
  durationMultiplier = 0.01,
  duration = 0.5,
  className,
}) => {
  const elementRefs = useRef([]);

  console.log({text});
  

  useEffect(() => {
    const elements = elementRefs.current;
    elements.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          translateY: "0%",
          opacity: 1,
          duration: index * durationMultiplier + duration,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el && el.scrollTrigger) {
          el.scrollTrigger.kill();
        }
      });
    };
  }, [duration, durationMultiplier]);

  return (
    <>
      {text?.split(" ").map((item, index) => (
        <div key={index} className={`animation-container ${className}`}>
          <div
            ref={(el) => (elementRefs.current[index] = el)}
            className="animation-element"
          >
            {item}
          </div>
        </div>
      ))}
    </>
  );
};

AnimateWords.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  refArray: PropTypes.shape({
    current: PropTypes.arrayOf(PropTypes.any),
  }),
  durationMultiplier: PropTypes.number,
  duration: PropTypes.number,
};

export default AnimateWords;
