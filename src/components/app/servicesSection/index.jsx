import styles from "./servicesSection.module.scss";
import { services } from "@/constants/constant";
import ServiceCard from "../serviceCard";
import PropTypes from "prop-types";
import React from "react";
import MainTitle from "@/components/ui/MainTitle";
import AnimatedButton from "@/components/ui/animatedButton";

const ServicesSection = ({ mode = "dark", showSeeAll = true }) => {
  return (
    <div
      className={`${styles.servicesSection} ${
        mode == "light" ? styles.light : ""
      }`}
      data-cursor={mode == "dark" ? "-inverse" : ""}
    >
      <div className="main_title">
        <MainTitle
          subtitle="Innovative services"
          title="shaping the future"
          mode={mode}
        />
        {showSeeAll && (
          <AnimatedButton mode={mode} link="/services" text="See All" />
        )}
      </div>
      <div className={styles.services}>
        {services.map((service, index) => (
          <React.Fragment key={service.id}>
            <ServiceCard {...service} mode={mode} />
            {services.length - 1 !== index && (
              <hr
                className={`${
                  mode == "dark" ? "text-serviceHr" : "text-divider_light"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

ServicesSection.propTypes = {
  mode: PropTypes.string,
  showSeeAll: PropTypes.bool,
};

export default ServicesSection;
