import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  children,
  variant = "primary",
  className,
  size = "large",
  type = "button",
  handleClick = () => {},
}) => {
  const buttonClass = classNames(
    {
      "text-primary": variant === "primary",
      "text-white": variant === "secondary",
      "bg-primary text-white": variant === "blackVariant",
      "text-gray-60": variant === "outlined",
      "bg-white text-primary": variant === "lightVariant",
    },
    className
  );

  const buttonSize = classNames({
    "py-2 px-4": size === "small",
    "px-6 py-4 ": size === "large",
  });

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${buttonSize} rounded ${buttonClass}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "blackVariant",
    "outlined",
    "lightVariant",
  ]),
  className: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(["small", "large"]),
  handleClick: PropTypes.func,
};

export default Button;
