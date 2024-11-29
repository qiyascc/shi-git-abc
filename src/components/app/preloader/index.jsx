import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./preloader.module.scss";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Preloader = ({ loadingTime }) => {
  const currentRef = useRef(null);
  const location = useLocation();
  const [loadingPercent, setLoadingPercent] = useState(0);

  const borderColor = location.pathname !== "/" ? "primary" : "white";
  const bgColor = location.pathname === "/" ? "primary" : "white";
  const loadingColor = location.pathname === "/" ? "gray_dark" : "gray_light";

  // useEffect(() => {
  //   const startLoader = () => {
  //     let currentValue = 0;

  //     const updateLoader = () => {
  //       if (currentValue === 100) {
  //         return;
  //       }

  //       currentValue += Math.floor(Math.random() * 10) + 1;

  //       if (currentValue > 100) {
  //         currentValue = 100;
  //       }

  //       setLoadingPercent(currentValue);
  //       setTimeout(updateLoader, loadingTime);
  //     };

  //     updateLoader();
  //   };
  //   startLoader();
  // }, []);

  useEffect(() => {
    let loading = 0;

    const timer = setInterval(() => {
      loading += Math.floor(Math.random() * 10) + 1;

      if (loading >= 100) {
        loading = 100;
      }

      setLoadingPercent(loading);
    }, loadingTime / 55);


    return () => clearInterval(timer)
  }, []);

  useEffect(() => {
    if (currentRef.current) {
      const [partOne, partTwo, partThree] = currentRef.current.querySelectorAll(
        `.${styles.animation_part}`
      );

      const tl = gsap.timeline();

      tl.set("html", { css: { overflowY: "hidden" } })
        .to(partOne, { opacity: 1, y: 0, duration: 0.4 }, 1)
        .to(partTwo, { opacity: 1, y: 0, duration: 0.4 }, 2)
        .to(partThree, { opacity: 1, y: 0, duration: 0.4 }, 3)
        .to(
          currentRef.current.querySelector(`.${styles.preloader_inner}`),
          {
            opacity: 0,
            duration: 0.6,
          },
          4
        )
        .to(
          currentRef.current.querySelector(`.${styles.preloader}`),
          {
            yPercent: -100,
            duration: 2,
            ease: "power2.out",
          },
          5
        )
        .set(
          currentRef.current,
          { delay: 1, visibility: "hidden", display: "none" },
          6
        )
        .to(
          "html",
          {
            duration: 0.1,
            css: { overflowY: "auto " },
          },
          7
        )
    }
  }, []);

  return (
    <div
      className={`w-full h-[100svh] fixed z-[9999] overflow-hidden`}
      ref={currentRef}
    >
      <div className={`${styles.preloader} bg-${borderColor}`}>
        <div
          className={`${styles.preloader_container} text-${borderColor} bg-${bgColor}`}
        >
          <div className={styles.preloader_inner}>
            <div className={styles.animation_container}>
              <div className={styles.animation_inner}>
                <div className={styles.animation_part}>
                  <div className={`${styles.animation_text}`}>Strategy</div>
                  <div className={styles.animation_point}></div>
                </div>
                <div className={styles.animation_part}>
                  <div className={`${styles.animation_text}`}>Harmonize</div>
                  <div className={styles.animation_point}></div>
                </div>
                <div className={styles.animation_part}>
                  <div className={`${styles.animation_text}`}>Innovation</div>
                  <div className={styles.animation_point}></div>
                </div>
              </div>
            </div>
            <div
              className={`${styles.loading_percent} border border-${loadingColor}`}
            >
              <div className={styles.percent_info}>{loadingPercent} %</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Preloader.propTypes = {
  loadingTime: PropTypes.number,
};

export default Preloader;
