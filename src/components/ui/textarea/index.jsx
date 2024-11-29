import { useEffect, useRef } from "react";
import ErrorMessage from "../ErrorMessage";
import styles from "./textarea.module.scss";
import PropTypes from "prop-types";
import AnimateElement from "../AnimateElement";

const Textarea = ({ name, labelName, value = "", handleChange, error }) => {
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <AnimateElement className="translate-y-16">
      <div className="w-full relative my-6 lg:my-8">
        <textarea
          ref={textareaRef}
          className={styles.input}
          value={value}
          name={name}
          id={name}
          onChange={(e) => {
            handleChange(e);
            adjustTextareaHeight();
          }}
          rows={1}
          style={{ overflow: "hidden", resize: "none" }}
        ></textarea>
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

Textarea.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  labelName: PropTypes.string,
  value: PropTypes.node.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Textarea;
