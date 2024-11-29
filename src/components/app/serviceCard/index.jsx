import PropTypes from "prop-types";
import styles from "./serviceCard.module.scss";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimateWords from "@/components/ui/AnimateWords";
import { LazyLoadImage } from "react-lazy-load-image-component";
gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({
  icon,
  title,
  description,
  tags,
  contentName,
  mode = "dark",
}) => {
  const imageRef = useRef();
  const tagsRef = useRef([]);

  const animateElement = useCallback((elements, durationMultiplier = 0.01) => {
    elements.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          translateY: "0%",
          opacity: 1,
          duration: index * durationMultiplier + 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    const image = imageRef.current;

    gsap.to(image, {
      translateY: "0",
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: image,
        start: "top 100%",
        toggleActions: "play none none none",
      },
    });

    animateElement(tagsRef.current);

    return () => {
      if (image && image.scrollTrigger) {
        image.scrollTrigger.kill();
      }
      [tagsRef].forEach((ref) => {
        ref.current.forEach((el) => {
          if (el && el.scrollTrigger) {
            el.scrollTrigger.kill();
          }
        });
      });
    };
  }, [animateElement]);

  console.log({tags});
  

  return (
    <div
      className={`${styles.serviceCard} ${
        mode === "light" ? styles.light : ""
      }`}
    >
      <div className={styles["card-header"]}>
        <div className={styles.image} ref={imageRef}>
          <LazyLoadImage src={icon} alt={title} />
        </div>
        <h3 className={styles.title}>
          <AnimateWords text={title} className="mr-3" />
        </h3>
      </div>
      <div className={styles.content}>
        {contentName && (
          <h4 className={styles.contentName}>
            <AnimateWords text={contentName} className="mr-2" />
          </h4>
        )}
        <div className={styles.description}>
          <AnimateWords text={description} className="mr-[7px]" />
        </div>
        {tags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <div
                className={styles.tag}
                key={tag.id}
                ref={(el) => (tagsRef.current[tag.id] = el)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  mode: PropTypes.string,
  contentName: PropTypes.string,
};

export default ServiceCard;
