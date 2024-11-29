import { parntershipsList,populatePartnershipsList } from "@/constants/constant";
import styles from "./partnershipsSlider.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const PartnershipsSlider = () => {
  const partnerships = useRef([]);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.partner_slider_container}`,
        start: "top 100%",
      },
    });

    partnerships.current.forEach((el, index) => {
      tl.to(
        el,
        {
          duration: index * 0.3 + 0.5,
          opacity: 1,
          translateY: 0,
          ease: "power1.out",
        },
        0.5
      );
    });
    populatePartnershipsList()

    return () => {
      tl.kill();
    };
  }, []);

  console.log(parntershipsList);
  

  return (
    <div className={`${styles.partner_slider}`}>
      <div
        className={`relative max-lg:grid h-[120px] overflow-hidden ${styles.partner_slider_container} `}
      >
        <ul className={`${styles.partnerships_container}`}>
          {parntershipsList.map((item, index) => (
            <li
              key={item.path}
              className={`${styles.image_container}`}
              ref={(el) => (partnerships.current[index + 1] = el)}
            >
              <LazyLoadImage src={item.path} alt={item.desc} />
            </li>
          ))}
        </ul>

        <ul className={`${styles.partnerships_container2}`}>
          {parntershipsList.map((item, index) => (
            <li
              key={item.path}
              className={`grid place-items-center w-1/6 min-w-[136px] max-h-[116px] ${styles.image_container}`}
              ref={(el) =>
                (partnerships.current[index + 1 + parntershipsList.length] = el)
              }
            >
              <img src={item.path} alt={item.desc} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PartnershipsSlider;
