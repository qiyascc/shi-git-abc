import MainTitle from "@/components/ui/MainTitle";
import styles from "./ourWorkflow.module.scss";
import { hoverableItems } from "@/constants/constant";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const OurWorkflow = () => {
  const linesRef = useRef([]);
  const titleElementsRef = useRef([]);
  const columnElementsRef = useRef([]);
  const [left, setLeft] = useState();

  const animateElement = useCallback((elements, durationMultiplier = 0.2) => {
    elements.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          translateY: "0%",
          opacity: 1,
          duration: index * durationMultiplier + 0.3,
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

  const animateLines = (lines) => {
    lines.forEach((line) => {
      if (window.innerWidth > 1024) {
        gsap.to(line, {
          height: "100%",
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: line,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        });
      } else {
        gsap.fromTo(
          line,
          { width: 0 },
          {
            width: "100%",
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
              trigger: line,
              start: "top bottom",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  };

  const setItemWidth = () => {
    const item = document.querySelector(`.${styles.hoverableItem}`);
    if (item) {
      const itemWidth = item.offsetWidth;
      setLeft(itemWidth - 24);
    }
  };

  useEffect(() => {
    const lines = linesRef.current;
    setItemWidth();
    window.addEventListener("resize", setItemWidth);
    animateLines(lines);
    return () => {
      window.removeEventListener("resize", setItemWidth, animateLines);
      lines.forEach((el) => {
        if (el && el.scrollTrigger) {
          el.scrollTrigger.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    animateElement(columnElementsRef.current);
    animateElement(titleElementsRef.current);
    return () => {
      [columnElementsRef, titleElementsRef].forEach((el) => {
        if (el && el.scrollTrigger) {
          el.scrollTrigger.kill();
        }
      });
    };
  }, [animateElement]);

  return (
    <div className={`shi-container wrapper ${styles.ourWorkflow}`}>
      <MainTitle
        subtitle="A few key things are needed "
        title="to do the best work"
      />
      <div className={styles.hoverableColumns}>
        {hoverableItems.map((item, index) => (
          <div className={styles.hoverableItem} key={item.id}>
            <span
              className={styles.hoverableItem_line}
              ref={(el) => (linesRef.current[index] = el)}
            ></span>
            <span
              className={styles.hoverableItem_number}
              ref={(el) => (columnElementsRef.current[index] = el)}
            >
              {item.column}
            </span>
            <div className={styles.hoverableItem_titleDescription}>
              <p
                className={styles.hoverableItem_title}
                ref={(el) => (titleElementsRef.current[index] = el)}
              >
                {item.title}
              </p>
              <p
                className={styles.hoverableItem_description}
                style={{ left: left }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWorkflow;
