import PropTypes from "prop-types";

const ArrowUp = ({color = "white"}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M13.28 10.0334L8.93334 5.68678C8.42 5.17345 7.58 5.17345 7.06667 5.68678L2.72 10.0334"
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

ArrowUp.propTypes = {
    color: PropTypes.oneOf(["white", "black"])
}


export default ArrowUp;
