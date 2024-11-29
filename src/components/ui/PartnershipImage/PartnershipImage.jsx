import PropTypes from "prop-types";
import styles from "./partnershipImage.module.scss";
import AnimateElement from "../AnimateElement";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PartnershipImage = ({ path, desc }) => {
  return (
    <AnimateElement className={`translate-y-[60px] ${styles.image}`}>
      <LazyLoadImage src={path} alt={desc} />
    </AnimateElement>
  );
};

PartnershipImage.propTypes = {
  path: PropTypes.string,
  desc: PropTypes.string,
};

export default PartnershipImage;
