import ArrowDown from "@/assets/ArrowDown";
import classNames from "classnames";
import PropTypes from "prop-types";

const Select = ({ variant = "white" }) => {
  const selectClassName = classNames({
    "text-white border-white bg-white": variant === "white",
    "text-primary  border-primary bg-primary": variant === "black",
  });
  return (
    <div className="relative inline-flex items-center mr-4">
      <select
        name="languages"
        id="languages"
        className={`appearance-none pl-3 pr-8 py-4 rounded border ${selectClassName} border-opacity-25 bg-opacity-[0.02] cursor-pointer leading-none `}
      >
        <option value="EN" className="text-primary">
          EN
        </option>
        <option value="AZ" className="text-primary">
          AZ
        </option>
        <option value="RU" className="text-primary">
          RU
        </option>
      </select>

      <div className="absolute right-3">
        {variant === "white" ? (
          <ArrowDown color="white" />
        ) : (
          <ArrowDown color="black" />
        )}
      </div>
    </div>
  );
};

Select.propTypes = {
  variant: PropTypes.oneOf(["white", "black"]),
};
export default Select;
