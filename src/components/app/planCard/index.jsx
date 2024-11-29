import PropTypes from "prop-types";
import styles from "./planCard.module.scss";
import AnimatedButton from "@/components/ui/animatedButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PlanCard = ({
  icon,
  title,
  description,
  buttonText,
  offers,
  mode = "light",
}) => {
  return (
    <div
      className={`${styles.plan} ${mode == "dark" ? styles.dark : ""}`}
      data-cursor={mode == "dark" ? "-inverse" : ""}
    >
      <div className={styles.title_image}>
        {icon && (
          <div className={styles.image}>
            <LazyLoadImage src={icon} alt={title} />
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.offers_content}>
        <div className={styles.content}>
          <p className={styles.description}>{description}</p>
          <AnimatedButton
            mode={mode == "light" ? "dark" : "light"}
            text={buttonText}
            className={`mb-0 border-primary shrink-0 ${
              mode == "dark" ? "bg-white border-white" : ""
            }`}
            link="/book-a-call"
          />
        </div>
        <ul className={styles.offers}>
          {offers.map((offer) => (
            <li key={offer.id} className={styles.offer}>
              <span className={styles.circle}></span>
              {offer.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
  buttonText: PropTypes.string,
  mode: PropTypes.string,
};
export default PlanCard;
