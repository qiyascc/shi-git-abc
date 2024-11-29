import AnimatedButton from "@/components/ui/animatedButton";
import styles from "./notFound.module.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet";
import AnimateWords from "@/components/ui/AnimateWords";
import AnimateElement from "@/components/ui/AnimateElement";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found | SHI Studio</title>
        <meta name="description" content="SHI Studio - Not Found page" />
      </Helmet>
      <div className={styles.notfound}>
        <div className={styles.notfound_container}>
          <div className={styles.notfound_inner}>
            <div>
              <div className="flex items-center">
                <div className={styles.text}>
                  <AnimateWords
                    text="4"
                    className="translate-y-1"
                    duration={0.3}
                  />
                </div>
                <AnimateElement className="translate-y-20" duration={0.4}>
                  <div className={styles.image_container}>
                    <LazyLoadImage
                      src="/images/not-found-image.png"
                      alt="Image"
                    />
                  </div>
                </AnimateElement>
                <div className={styles.text}>
                  <AnimateWords
                    text="4"
                    className="translate-y-1"
                    duration={0.3}
                  />
                </div>
              </div>

              <div className="grid place-items-center">
                <div>
                  <div className={styles.message}>
                    <AnimateWords
                      text="Oops! The page you are looking for was not found!"
                      className="mr-2"
                    />
                  </div>

                  <div className="grid place-items-center">
                    <Link to="/">
                      <AnimatedButton
                        text="Back to home"
                        mode="light"
                        className="bg-white text-primary border-white"
                      ></AnimatedButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
