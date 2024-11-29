import PartnershipsSlider from "../partnershipsSlider";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./mainSection.module.scss";
import AnimateWords from "@/components/ui/AnimateWords";
import { parntershipsList, populatePartnershipsList } from "@/constants/constant";


populatePartnershipsList();

const MainSection = () => {
  const heroContainerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(heroContainerRef.current, {
      opacity: 1,
      duration: 1.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="mt-0">
      <div
        data-cursor="-inverse"
        ref={heroContainerRef}
        className={`bg-primary rounded-xl overflow-hidden opacity-0 ${styles.hero_container}`}
      >
        <div className={`${styles.hero_title} pl-3`}>
          <div className={`${styles.hero_subtitle}`}>
            <div className="animation-container mr-0">
              <AnimateWords text="—" duration={0.6} />
            </div>
            <div className="max-w-[320px] leading-[130%]">
              <AnimateWords
                text="is a design & technology studio that develops tailor-made digital"
                duration={0.61}
                durationMultiplier={0.01}
              />
            </div>
          </div>

          <h1 className="text-white pt-[32px] lg:pt-[50px] leading-[87%]">
            <AnimateWords
              text="SHI Studio"
              durationMultiplier={0.2}
              duration={0.6}
              className="title"
            />
          </h1>
        </div>
      </div>

      <PartnershipsSlider />
    </section>
  );
};

export default MainSection;
