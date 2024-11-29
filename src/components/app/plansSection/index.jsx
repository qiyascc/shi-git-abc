import styles from "./plansSection.module.scss";
import { plans } from "@/constants/constant";
import PlanCard from "../planCard";
import PropTypes from "prop-types";
import AnimateElement from "@/components/ui/AnimateElement";

const PlansSection = ({ mode = "light" }) => {
  return (
    <AnimateElement className="translate-y-16">
      <div
        className={`${styles.planSection} ${
          mode == "dark" ? styles.dark : "wrapper"
        }`}
      >
        <div className={styles.plans}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} {...plan} mode={mode} />
          ))}
        </div>
      </div>
    </AnimateElement>
  );
};

PlansSection.propTypes = {
  mode: PropTypes.string,
};

export default PlansSection;
