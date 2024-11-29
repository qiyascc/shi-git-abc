import PropTypes from "prop-types";

const Checkbox = ({ value, labelName, handleChange, name, error }) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        name={name}
        checked={value}
        onChange={handleChange}
        className={`cursor-pointer transition-all duration-300 ease-custom ${
          error ? "!border-error" : ""
        }`}
        id={name}
      />
      <label
        htmlFor={name}
        className={`text-[14px] cursor-pointer transition-all duration-300 ease-custom ${
          error ? "text-error" : ""
        }`}
      >
        {labelName}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelName: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.bool,
};
export default Checkbox;
