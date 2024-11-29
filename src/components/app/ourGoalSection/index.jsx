import MainTitle from "@/components/ui/MainTitle";
import styles from "./ourGoalSection.module.scss";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimateWords from "@/components/ui/AnimateWords";
gsap.registerPlugin(ScrollTrigger);

const OurGoal = ({ goalName, goalContent, statistics }) => {
  const statisticsRefs = useRef({
    members: null,
    completedProjects: null,
    ongoingProjects: null,
  });

  const animateNumbers = useCallback((element, endValue) => {
    if (element) {
      gsap.fromTo(
        element,
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            element.innerText = Math.floor(this.targets()[0].innerText);
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (statistics) {
      animateNumbers(statisticsRefs.current.members, 10);
      animateNumbers(statisticsRefs.current.completedProjects, 50);
      animateNumbers(statisticsRefs.current.ongoingProjects, 10);
    }
  }, [animateNumbers, statistics]);

  return (
    <div className="shi-container wrapper">
      <MainTitle
        subtitle="Creativity merges with strategy and"
        title="stunning design meets functionality"
        largeSize={true}
      />

      <div className={styles.goal_container}>
        <div className={styles.title_container}>
          <h4 className="md:text-[32px] text-text-color text-2xl">
            <AnimateWords text={goalName} />
          </h4>
        </div>

        <div className="min-[1200px]:pr-[13%]">
          <div className={styles.goal_content}>
            <AnimateWords text={goalContent} />
          </div>

          {statistics && (
            <div className="mt-16 max-md:mt-8 flex gap-6">
              {[
                { label: "members", value: 10, ref: "members" },
                {
                  label: "completed projects",
                  value: 50,
                  ref: "completedProjects",
                },
                {
                  label: "ongoing projects",
                  value: 10,
                  ref: "ongoingProjects",
                },
              ].map((stat, index) => (
                <div className={styles.statistics_inner} key={index}>
                  <div className="flex">
                    <span
                      className={styles.statistics}
                      ref={(el) => (statisticsRefs.current[stat.ref] = el)}
                    >
                      0
                    </span>
                    <span className={styles.statistics}>+</span>
                  </div>
                  <span className={styles.statistics_name}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

OurGoal.propTypes = {
  goalName: PropTypes.string,
  goalContent: PropTypes.string,
  statistics: PropTypes.bool.isRequired,
};

export default OurGoal;
