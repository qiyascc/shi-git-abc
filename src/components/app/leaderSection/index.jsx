import MainTitle from "@/components/ui/MainTitle";
import styles from "./leaderSection.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import InstagramLogo from "@/assets/InstagramLogo";
import LinkedinLogo from "@/assets/LinkedinLogo";
import { leaderSocialMediaList } from "@/constants/constant";
import { Link } from "react-router-dom";
import AnimateElement from "@/components/ui/AnimateElement";
import { LazyLoadImage } from "react-lazy-load-image-component";
gsap.registerPlugin(ScrollTrigger);

const componentMap = {
  LinkedinLogo: <LinkedinLogo fill="white" />,
  InstagramLogo: <InstagramLogo fill="white" />,
};

const LeaderSection = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const getScrollValues = () => {
      const isMobile = window.innerWidth < 768;
      return {
        endValue: isMobile ? "top 50%" : "top -30%",
        startValue: isMobile ? "top top" : "top 40%",
      };
    };

    const { endValue, startValue } = getScrollValues();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollEl,
        scrub: 5,
        start: startValue,
        end: endValue,
      },
    });

    tl.to(".one_leader", { left: "-200%", top: "-111%" }, 0.1)
      .to(".two_leader", { right: "-90%", top: "-190%" }, 0.1)
      .to(".three_leader", { left: "-190%", bottom: "-90%" }, 0.1);
  }, []);

  return (
    <section className="wrapper">
      <div>
        <MainTitle
          subtitle="Visionary leadership driving"
          title="creative innovation forward"
        />

        <div>
          <div className={styles.leader_image} ref={scrollRef}>
            <div className="h-full">
              <LazyLoadImage
                src="/images/leader_image.png"
                alt=""
                className="object-cover h-full"
              />
              <div className={styles.leader_wrapper}>
                <div className={styles.leader_info}>
                  <div className="flex gap-[6px] flex-col">
                    <h6 className={styles.leader_subtitle}>FOUNDER</h6>
                    <p className={styles.leader_name}>Zahra SHI Ismayilzade</p>
                  </div>
                  <div className={styles.leader_logo}>
                    <LazyLoadImage alt="Image" src="/images/shi-logo-2.svg" />
                  </div>
                </div>
              </div>
            </div>
            <span
              data-cursor="-inverse"
              className="one_leader"
              style={{ top: "-45.9323%", left: "-141.731%" }}
            ></span>
            <span
              data-cursor="-inverse"
              className="two_leader"
              style={{ top: "-77.3462%", right: "-51.1542%" }}
            ></span>
            <span
              data-cursor="-inverse"
              className="three_leader"
              style={{ bottom: "-45.3264%", left: "-107.453%" }}
            ></span>
          </div>
          <AnimateElement className="translate-y-20">
            <div className="my-16">
              <div className="pt-10 border-t border-t-gray_light flex justify-between flex-wrap">
                <div className="text-text-color text-[32px] mb-6 lg:mb-0">
                  Connect with Zahra for Insights & Inspiration
                </div>

                <div>
                  {leaderSocialMediaList.map((item, i) => (
                    <Link
                      to={item.link}
                      className={styles.social_media_link}
                      key={i}
                    >
                      {componentMap[item.element]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimateElement>
        </div>
      </div>
    </section>
  );
};

export default LeaderSection;
