import { contactNavbar } from "@/constants/constant";
import { NavLink } from "react-router-dom";
import styles from "./contactNavbar.module.scss";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ContactNavbar = () => {
  const elementRefs = useRef([]);
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

  useEffect(() => {
    const elements = elementRefs.current;

    animateElement(elements, 0.2);

    return () => {
      elements.forEach((el) => {
        if (el && el.scrollTrigger) {
          el.scrollTrigger.kill();
        }
      });
    };
  }, [animateElement]);

  return (
    <nav
      className="overflow-x-auto max-lg:my-8 mt-16 w-full"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <ul className="flex lg:flex-col lg:gap-4 gap-2 max-lg:w-[600px]">
        {contactNavbar.map((item, index) => (
          <li
            key={item.path}
            className="opacity-0 translate-y-16"
            ref={(el) => (elementRefs.current[index] = el)}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.nav_link} ${isActive && styles.nav_link_active}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ContactNavbar;
