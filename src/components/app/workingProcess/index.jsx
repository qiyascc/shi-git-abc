import { useEffect, useRef, useState } from "react";
import styles from "./workingProcess.module.scss";
import MainTitle from "@/components/ui/MainTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const WorkingProcess = () => {
  const pin = useRef(null);
  const strategyTitleRef = useRef([]);
  const strategyDescriptionRef = useRef([]);
  const harmonyTitleRef = useRef([]);
  const harmonyDescriptionRef = useRef([]);
  const innovationTitleRef = useRef([]);
  const innovationDescriptionRef = useRef([]);
  const [isFlexColumn, setIsFlexColumn] = useState(false);

  const animateSection = (titleArray, descriptionArray) => {
    titleArray.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { translateY: "100%", opacity: 0 },
        {
          translateY: "0%",
          opacity: 1,
          duration: index * 0.1 + 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
          },
        }
      );
    });
    descriptionArray.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { translateY: "100%", opacity: 0 },
        {
          translateY: "0%",
          opacity: 1,
          duration: index * 0.01 + 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
          },
        }
      );
    });
  };
  useGSAP(() => {
    animateSection(strategyTitleRef, strategyDescriptionRef);
  }, []);

  useGSAP(() => {
    animateSection(strategyTitleRef, strategyDescriptionRef);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsFlexColumn(window.innerWidth < window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    const el = pin.current;
    const sElement = document.querySelector(".s");
    const hElement = document.querySelector(".h");
    const iElement = document.querySelector(".i");
    const sElementDivider = document.querySelector(`.${styles.large}`);
    const hElementDivider = document.querySelector(`.${styles.medium}`);
    const iElementDivider = document.querySelector(`.${styles.small}`);

    const tl = gsap.timeline({
      scrollTrigger: {
        scroller: "body",
        trigger: el,
        pin: el,
        start: "center center",
        end: "+=" + window.innerHeight,
        scrub: true,
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
      },
    });

    tl.to(".s-on", { opacity: 0, duration: 1.5 }, 0)
      .to(".h-on", { opacity: 1, duration: 1.5 }, 0.5)
      .to(".h-on", { opacity: 0, duration: 1.5 }, 1.5)
      .to(".i-on", { opacity: 1, duration: 1.5 }, 2);

    ScrollTrigger.create({
      trigger: ".s-on",
      start: "top bottom",
      end: "bottom 25%",
      onEnterBack: () => {
        sElement.style.display = "block";
        hElement.style.display = "none";
        iElement.style.display = "none";
        sElementDivider.classList.add("block");
        sElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%]";
        hElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%] hidden";
        iElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[45%] hidden";
        animateSection(strategyTitleRef, strategyDescriptionRef);
      },
    });

    ScrollTrigger.create({
      trigger: ".h-on",
      start: "top 12%",
      end: "bottom 8%",
      onEnterBack: () => {
        sElement.style.display = "none";
        hElement.style.display = "block";
        iElement.style.display = "none";
        sElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%] hidden";
        hElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%] block";
        iElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[45%] hidden";
        animateSection(harmonyTitleRef, harmonyDescriptionRef);
      },
      onEnter: () => {
        sElement.style.display = "none";
        hElement.style.display = "block";
        iElement.style.display = "none";
        sElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%] hidden";
        hElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%] block";
        iElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[45%] hidden";
        animateSection(harmonyTitleRef, harmonyDescriptionRef);
      },
    });

    ScrollTrigger.create({
      trigger: ".i-on",
      start: "top top",
      end: "bottom top",
      onLeave: () => {
        sElement.style.display = "none";
        hElement.style.display = "none";
        iElement.style.display = "block";
        sElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%] hidden";
        hElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[59%] hidden";
        iElementDivider.className =
          "absolute min-[950px]:hidden -left-5 min-[480px]:-left-7 top-[45%] block";
        animateSection(innovationTitleRef, innovationDescriptionRef);
      },
    });
  });

  return (
    <div
      className="wrapper mr-0 pinned-section shi-container mb-16 min-[1200px]:mb-0 pt-0"
      ref={pin}
    >
      <div
        className={styles.pinned_section}
        style={{ height: "calc(100svh - 128px)" }}
      >
        <MainTitle subtitle="How We Create Brands" title="That Reach Deeper" />

        <div className={styles.scroll_wrap}>
          <div className="grid place-items-center h-full">
            <div
              className={`${styles.scroll_container} ${
                isFlexColumn ? "!flex-col pt-[65px]" : ""
              }`}
            >
              <div className={styles.scroll_images_container}>
                <div className="w-fit relative">
                  <img
                    src="/images/divider.svg"
                    alt=""
                    className={styles.mobile_divider}
                  />
                  <div className={`img_container ${styles.img_container}`}>
                    <img
                      src="/images/letter_s_off.svg"
                      alt=""
                      className="s-off"
                    />
                    <img
                      src="/images/letter_s_on.svg"
                      alt=""
                      className="s-on"
                    />
                  </div>

                  <div className={`img_container ${styles.img_container}`}>
                    <img
                      src="/images/letter_h_off.svg"
                      alt=""
                      className="h-off"
                    />
                    <img
                      src="/images/letter_h_on.svg"
                      alt=""
                      className="h-on"
                    />
                  </div>

                  <div
                    className={`img_container ${styles.img_container} -bottom-[15px]`}
                  >
                    <img
                      src="/images/letter_i_off.svg"
                      alt=""
                      className="i-off"
                    />
                    <img
                      src="/images/letter_i_on.svg"
                      alt=""
                      className="i-on"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.scroll_content_container}>
                <div className={`${styles.divider_desktop}`}></div>
                <div className={`${styles.content_container} s`}>
                  <h4 className={`${styles.scroll_content_title}`}>
                    {"Strategy".split(" ").map((item, index) => (
                      <div
                        key={index}
                        className={`animation-container lg:mr-[2px] lg:last-of-type:mr-0`}
                      >
                        <div
                          ref={(el) => (strategyTitleRef.current[index] = el)}
                          className="animation-element"
                        >
                          {item}
                        </div>
                      </div>
                    ))}
                  </h4>
                  <div className={`${styles.scroll_content_text}`}>
                    {"Our first step is detailed research and planning based on the client’s needs. We analyze your brand and offer the best strategic solutions. This builds a strong foundation for the project's success."
                      .split(" ")
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`animation-container mr-[5px]`}
                        >
                          <div
                            ref={(el) =>
                              (strategyDescriptionRef.current[index] = el)
                            }
                            className="animation-element"
                          >
                            {item}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className={`${styles.content_container} h hidden`}>
                  <h4 className={`${styles.scroll_content_title} `}>
                    {"Harmony".split(" ").map((item, index) => (
                      <div
                        key={index}
                        className={`animation-container lg:mr-[2px] lg:last-of-type:mr-0`}
                      >
                        <div
                          ref={(el) => (harmonyTitleRef.current[index] = el)}
                          className="animation-element"
                        >
                          {item}
                        </div>
                      </div>
                    ))}
                  </h4>
                  <div className={`${styles.scroll_content_text}`}>
                    {"After strategy, we move on to the design and development stage that aligns with your brand's goals. From UI/UX to functional solutions, we bring everything together to create a smooth user experience."
                      .split(" ")
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`animation-container mr-[5px]`}
                        >
                          <div
                            ref={(el) =>
                              (harmonyDescriptionRef.current[index] = el)
                            }
                            className="animation-element"
                          >
                            {item}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className={`${styles.content_container} i hidden`}>
                  <h4 className={`${styles.scroll_content_title}`}>
                    {"Innovation".split(" ").map((item, index) => (
                      <div
                        key={index}
                        className={`animation-container lg:mr-[2px] lg:last-of-type:mr-0`}
                      >
                        <div
                          ref={(el) => (innovationTitleRef.current[index] = el)}
                          className="animation-element"
                        >
                          {item}
                        </div>
                      </div>
                    ))}
                  </h4>
                  <div className={`${styles.scroll_content_text}`}>
                    {"In the final stage, we use the latest technologies and trends to apply innovative solutions. This helps your brand stand out from competitors and ensures long-term impact."
                      .split(" ")
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`animation-container mr-[5px]`}
                        >
                          <div
                            ref={(el) =>
                              (innovationDescriptionRef.current[index] = el)
                            }
                            className="animation-element"
                          >
                            {item}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingProcess;
