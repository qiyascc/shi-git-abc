import AnimatedButton from "@/components/ui/animatedButton";
import styles from "./successModal.module.scss";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SuccesModal = ({ setShow }) => {
  return (
    <div className={styles.modal}>
      <div className={styles["modal-inner"]}>
        <LazyLoadImage src="/images/confirmation.gif" alt="logo" className="w-[200px]" />
        <p className={styles.description}>
          Thank you! Your submission has been received and we will get back to
          you in the shortest amount of time!
        </p>
        <div onClick={() => setShow(false)}>
          <AnimatedButton
            animation={false}
            mode="dark"
            text="Done"
            className="mb-0 border-primary"
          />
        </div>
      </div>
    </div>
  );
};

SuccesModal.propTypes = {
  setShow: PropTypes.func,
};

export default SuccesModal;
