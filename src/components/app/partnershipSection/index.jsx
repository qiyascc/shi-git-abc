import PropTypes from "prop-types";
import MainTitle from "@/components/ui/MainTitle";
import styles from "./partnershipSection.module.scss";
import { useEffect, useState } from "react";
import { parntershipsListExpanded } from "@/constants/constant";
import AnimatedButton from "@/components/ui/animatedButton";
import PartnershipImage from "@/components/ui/PartnershipImage/PartnershipImage";

const PartnershipSection = ({ buttonText }) => {
  const [interval, setInterval] = useState([0, 1]);

  const calculateInterval = () => {
    if (window.innerWidth < 1024) {
      setInterval([0]);
    } else {
      setInterval([0, 1]);
    }
  };

  useEffect(() => {
    calculateInterval();
    window.addEventListener("resize", calculateInterval);

    return () => {
      window.removeEventListener("resize", calculateInterval);
    };
  }, []);

  return (
    <div className={`${styles.partnershipSection} shi-container wrapper`}>
      <div className="main_title">
        <MainTitle
          subtitle="Empowering creativity"
          title="through strategic partnerships"
        />
        <AnimatedButton text={buttonText} link="/contact/become-our-partner" />
      </div>
      <div className="flex flex-col gap-3">
        <div className={styles.row}>
          {interval.map((colIndex) => (
            <div key={colIndex} className={styles.col}>
              {parntershipsListExpanded
                .slice(colIndex * 6, colIndex * 6 + 6)
                .map((partners, index) => (
                  <PartnershipImage {...partners} key={index} />
                ))}
            </div>
          ))}
        </div>

        {interval.length < 3 && (
          <button
            onClick={() => setInterval([0, 1, 2])}
            className="load_animation down"
          >
            <span>Load more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 4.16699V15.8337M10 15.8337L5 10.8337M10 15.8337L15 10.8337"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {interval.length === 3 && (
          <button
            onClick={() => setInterval([0, 1])}
            className="load_animation up"
          >
            <span>View less</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M12 19L12 5M12 5L18 11M12 5L6 11"
                stroke="#222222"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

PartnershipSection.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default PartnershipSection;
