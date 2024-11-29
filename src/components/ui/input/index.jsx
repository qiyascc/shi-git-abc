import PropTypes from "prop-types";
import styles from "./input.module.scss";
import ErrorMessage from "../ErrorMessage";
import AnimateElement from "../AnimateElement";

const Input = ({
  name,
  labelName,
  value,
  type = "text",
  handleChange,
  error,
}) => {
  return (
    <AnimateElement className="translate-y-16">
      <div className="w-full relative">
        <input
          type={type}
          className={styles.input}
          value={value}
          name={name}
          id={name}
          onChange={handleChange}
        />
        <label
          htmlFor={name}
          className={`${styles.label} ${
            value.length > 0 ? styles.active : ""
          } `}
        >
          {labelName}
        </label>
        {error && <ErrorMessage value={error} />}
      </div>
    </AnimateElement>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  labelName: PropTypes.string,
  value: PropTypes.node.isRequired,
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
