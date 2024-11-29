import { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./loader.module.scss";

const Loader = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.set(`.${styles.loader}`, { display: "block" }) 
      .to(`.${styles["loader-backdrop"]}`, { opacity: 0, duration: 0 }) 
      .from(`.${styles["loader-fill"]}`, {
        opacity: 1,
        scaleY: 0,
        transformOrigin: "100% 100%",
        duration: 0.3, 
      })
      .to(`.${styles["loader-backdrop"]}`, { opacity: 1, duration: 0.3 })
      .to(`.${styles["loader-fill"]}`, {
        scaleY: 1,
        transformOrigin: "100% 100%",
        duration: 0.3, 
        ease: "sine.in",
      })
      .to(`.${styles["loader-backdrop"]}`, { opacity: 0, duration: 0.3 })
      .to(`.${styles["loader-fill"]}`, {
        opacity: 0,
        duration: 0.3, 
      })
      .to(`.${styles.loader}`, {
        display: "none",
        duration: 0,
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.loader}>
      <div className={styles["loader-backdrop"]}></div>
      <div className={styles["loader-fill"]}></div>
    </div>
  );
};

export default Loader;
