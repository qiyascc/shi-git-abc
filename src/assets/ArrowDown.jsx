import PropTypes from "prop-types";

const ArrowDown = ({color = "white"}) => {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.28 5.96655L8.93334 10.3132C8.42 10.8266 7.58 10.8266 7.06667 10.3132L2.72 5.96655"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

ArrowDown.propTypes = {
    color: PropTypes.oneOf(["white", "black"])
}

export default ArrowDown;
