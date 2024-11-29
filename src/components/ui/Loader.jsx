import { LazyLoadImage } from "react-lazy-load-image-component";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <LazyLoadImage
          src="images/loader.svg"
          alt="loader"
          width={32}
          height={32}
          className="animate-spin"
        />
        Loading...
      </div>
    </div>
  );
};

export default Loader;
