import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

const MainTitle = ({ subtitle, title, mode = "light", largeSize = false }) => {
  const elementRefs = useRef([]);

  useEffect(() => {
    const elements = elementRefs.current;

    elements.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          translateY: "0%",
          opacity: 1,
          duration: index * 0.08 + 0.4,
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
  }, []);

  return (
    <>
      <h2
        className={`header ${
          mode === "light" ? "text-black" : "text-white"
        } leading-[120%] main-title`}
      >
        <span
          className={`${
            !largeSize ? "lg:block" : "min-[1070px]:block"
          } text-gray`}
        >
          {subtitle.split(" ").map((item, index) => (
            <div
              key={index}
              className="animation-container last-of-type:mr-[3px] lg:mr-4 lg:last-of-type:mr-4"
            >
              <div
                ref={(el) => (elementRefs.current[index] = el)}
                className="animation-element"
              >
                {item}
              </div>
            </div>
          ))}
        </span>
        {title.split(" ").map((item, index) => (
          <div key={index} className="animation-container lg:mr-4">
            <div
              ref={(el) =>
                (elementRefs.current[index + subtitle.split(" ").length] = el)
              }
              className="animation-element"
            >
              {item}
            </div>
          </div>
        ))}
      </h2>
    </>
  );
};

MainTitle.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  mode: PropTypes.string,
  largeSize: PropTypes.bool,
};

export default MainTitle;
