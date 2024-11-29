import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
gsap.registerPlugin(ScrollTrigger);

const WorksView = ({ primaryImage, childImageOne, childImageTwo }) => {
  const imagesRef = useRef([]);
  useEffect(() => {
    const images = imagesRef.current;

    images.forEach((el, index) => {
      gsap.to(
        el,
        {
          translateY: "0",
          opacity: 1,
          duration: index * 0.3 + 1.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        },
        0.5
      );
    });

    return () => {
      images.forEach((el) => {
        if (el && el.scrollTrigger) {
          el.scrollTrigger.kill();
        }
      });
    };
  }, []);
  return (
    <div className="shi-container wrapper">
      <div className="flex flex-col md:gap-6 gap-4">
        <div
          className="opacity-0 translate-y-20"
          ref={(el) => (imagesRef.current[0] = el)}
        >
          <LazyLoadImage
            src={primaryImage}
            alt=""
            className=" rounded-2xl max-h-[672px] w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 md:gap-6 gap-4">
          {[childImageOne, childImageTwo].map((item, index) => (
            <div
              className="max-h-[660px] opacity-0 translate-y-10"
              ref={(el) => (imagesRef.current[index + 1] = el)}
              key={index}
            >
              <LazyLoadImage
                src={item}
                alt="Image"
                className=" rounded-2xl object-cover h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

WorksView.propTypes = {
  primaryImage: PropTypes.string,
  childImageOne: PropTypes.string,
  childImageTwo: PropTypes.string,
};

export default WorksView;
