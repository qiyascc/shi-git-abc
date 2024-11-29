import classNames from "classnames";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.scss";
import ArrowUp from "@/assets/ArrowUp";
import AnimateElement from "../AnimateElement";

const Dropdown = ({ variant = "white" }) => {
  const selectClassName = classNames({
    "text-white border border-white bg-white border-opacity-25":
      variant === "white",
    "text-primary border border-gray_light": variant === "black",
  });
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const values = ["EN", "AZ", "RU"];
  const [value, setValue] = useState("EN");

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <AnimateElement className="translate-y-5">
      <div
        className={`${selectClassName} bg-opacity-[0.02] rounded absolute -left-[84px]`}
      >
        <button
          onClick={() => setActive((prev) => !prev)}
          ref={ref}
          className="flex items-center gap-1 py-4 px-3"
        >
          <span>{value}</span>
          <div
            className={`opacity-100 transition-opacity duration-300 ease-in-out`}
          >
            <div
              className={`${
                !active ? "rotate-180" : ""
              } duration-300 ease-custom transition-[transform] `}
            >
              <ArrowUp color={variant === "white" ? "white" : "black"} />
            </div>
          </div>
        </button>

        <div>
          <div
            className={`w-full ${styles.lang_container} ${
              active && styles.active
            }`}
          >
            {values
              .filter((item) => item !== value)
              .map((item, index) => (
                <span
                  key={index}
                  className={`block pt-3 px-3 cursor-pointer opacity-70 md:hover:opacity-100 transition-opacity duration-300 ${
                    index === 0 ? "pb-2" : "pb-3"
                  }`}
                  onClick={() => {
                    setValue(item);
                    setActive(false);
                  }}
                >
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
    </AnimateElement>
  );
};

Dropdown.propTypes = {
  variant: PropTypes.oneOf(["white", "black"]),
};

export default Dropdown;
