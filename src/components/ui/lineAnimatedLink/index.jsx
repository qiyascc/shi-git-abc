import styles from "./lineAnimatedLink.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AnimateElement from "../AnimateElement";

const LineAnimatedLink = ({ children }) => {
  return (
    <AnimateElement className="translate-y-3">
      <Link to="/" className={styles.animated_link_inner}>
        <div className={styles.animated_link}>{children}</div>
        <span className={styles.link_name}>Link for Behance</span>
      </Link>
    </AnimateElement>
  );
};

LineAnimatedLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LineAnimatedLink;
