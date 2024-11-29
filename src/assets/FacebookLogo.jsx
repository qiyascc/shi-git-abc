import PropTypes from "prop-types";
const FacebookLogo = ({ fill }) => {
  return (
    <>
      <svg
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 1.7959C7.2345 1.7959 1.75 7.2804 1.75 14.0459C1.75 19.7911 5.705 24.6115 11.0408 25.9354V17.7891H8.51463V14.0459H11.0408V12.4333C11.0408 8.2639 12.9272 6.33102 17.0214 6.33102C17.7975 6.33102 19.1362 6.48327 19.684 6.63552V10.0288C19.3953 9.99815 18.893 9.98327 18.2691 9.98327C16.2601 9.98327 15.484 10.7445 15.484 12.722V14.0459H19.4854L18.7976 17.7891H15.484V26.2058C21.5495 25.4734 26.25 20.3083 26.25 14.0459C26.25 7.2804 20.7655 1.7959 14 1.7959Z"
          fill={fill}
        />
      </svg>
    </>
  );
};

FacebookLogo.propTypes = {
  fill: PropTypes.string,
};

export default FacebookLogo;
