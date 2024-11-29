import PropTypes from "prop-types";
import styles from "./workOverview.module.scss";
import AnimateWords from "@/components/ui/AnimateWords";
import AnimateElement from "@/components/ui/AnimateElement";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WorkOverview = ({ title, short_description, image }) => {
  return (
    <div className="shi-container wrapper">
      <div>
        <h2 className={styles.title}>
          <AnimateWords text={title} className="mr-6" />
        </h2>
        <div className={styles.content}>
          <AnimateWords
            text={short_description}
            className="mr-[9px]"
          />
        </div>
      </div>
      <AnimateElement className="translate-y-[40px]">
        <div className="md:mt-16 mt-8">
          <LazyLoadImage src={image} alt="Image" className={styles.image} />
        </div>
      </AnimateElement>
    </div>
  );
};

WorkOverview.propTypes = {
  title: PropTypes.string,
  short_description: PropTypes.string,
  image: PropTypes.string,
};

export default WorkOverview;
