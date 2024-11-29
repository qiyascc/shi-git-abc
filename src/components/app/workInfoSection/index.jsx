import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./workInfoSection.module.scss";
import LineAnimatedLink from "@/components/ui/lineAnimatedLink";
import BehanceLogo from "@/assets/BehanceLogo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimateWords from "@/components/ui/AnimateWords";

gsap.registerPlugin(ScrollTrigger);

const WorkInfoSection = ({ title, viewFullSiteLink, viewFullSiteText, description, behanceLink, projectDetails }) => {
  const imageRef = useRef();
  const linksRef = useRef([]);
  const fieldsRef = useRef([]);

  useEffect(() => {
    const image = imageRef.current;
    const linkElements = linksRef.current;
    const fields = fieldsRef.current;

    linkElements.forEach((el) => {
      gsap.to(el, {
        translateY: "0",
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      });
    });

    fields.forEach((el, index) => {
      gsap.to(
        el,
        {
          translateY: "0",
          opacity: 1,
          duration: index * 0.3 + 0.5,
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

    return () => {
      if (image && image.scrollTrigger) {
        image.scrollTrigger.kill();
      }
      [linksRef, fieldsRef].forEach((ref) => {
        ref.current.forEach((el) => {
          if (el && el.scrollTrigger) {
            el.scrollTrigger.kill();
          }
        });
      });
    };
  }, []);

  return (
    <div className="shi-container wrapper">
      <div className="flex justify-between items-start max-lg:flex-col max-lg:gap-16">
        <div className="lg:w-[49%] w-full">
          <h4 className="md:text-[32px] text-[28px] text-text-color mb-3">
            <AnimateWords text={title} className="mr-[10px]" />
          </h4>

          <Link
            to={viewFullSiteLink}
            className={styles.link_button}
            ref={(el) => (linksRef.current[0] = el)}
          >
            <span className="pb-[1px] text-xl">{viewFullSiteText}</span>
            <div className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M11 0.999512L1 10.9995M11 0.999512H2M11 0.999512V9.99951"
                  stroke="#222222"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>

          <div className="my-9 md:text-2xl text-xl font-helvetica_light leading-normal flex flex-col gap-12">
            <div>
              <AnimateWords
                text={description}
                className="mr-2"
              />
            </div>
          </div>
          <div
            ref={(el) => (linksRef.current[1] = el)}
            className="opacity-0 translate-y-10"
          >
            <LineAnimatedLink to={behanceLink}>
              <BehanceLogo fill="white" />
            </LineAnimatedLink>
          </div>
        </div>
        <div className="lg:w-2/5 w-full">
          {projectDetails.map((item, index) => (
            <div
              className={styles.table_container}
              key={index}
              ref={(el) => (fieldsRef.current[index] = el)}
            >
              <span className={styles.table_title}>{item.title}</span>
              <span className={styles.table_content}>
                {Array.isArray(item.content)
                  ? item.content.map((line, i) => (
                      <p key={i} className={styles.table_content_text}>
                        — {line}
                      </p>
                    ))
                  : item.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkInfoSection;

