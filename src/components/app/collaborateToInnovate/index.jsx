import MainTitle from "@/components/ui/MainTitle";
import styles from "./collaborateToInnovate.module.scss";
import { parallaxImages } from "@/constants/constant";
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import AnimatedButton from "@/components/ui/animatedButton";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimateElement from "@/components/ui/AnimateElement";
import { LazyLoadImage } from "react-lazy-load-image-component";
gsap.registerPlugin(ScrollTrigger);

const CollaborateToInnovate = () => {
  const parallax_imagesList = useRef(null);
  const imagesList = useMemo(
    () =>
      parallaxImages.map((image) => (
        <li key={image.id} className={styles.parallax_imageList_Item}>
          <div className={styles.parallax_imageList_imgContainer}>
            <LazyLoadImage
              src={image.image}
              alt={`Image of ${image.id}`}
              className={styles.parallax_imageList_Item_img}
            />
          </div>
        </li>
      )),
    []
  );

  useEffect(() => {
    const scrollEl = parallax_imagesList.current;
    const endValue = window.innerWidth < 768 ? "top 10%" : "top -90%";
    const startValue = window.innerWidth < 768 ? "top 180%" : "top 200%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollEl,
        scrub: 1,
        start: startValue,
        end: endValue,
      },
    });

    tl.to(".list-items", { x: -900 }, 0.3);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={parallax_imagesList} className="overflow-hidden my-16">
      <div className="divider">
        <div className="wrapper mb-8 lg:mb-12">
          <MainTitle
            subtitle="Creative collaboration"
            title="fueled by shared passion"
          />
        </div>
      </div>
      <div className={styles.parallax_imagesListContainer}>
        {imagesList.length > 0 && (
          <ul className={`${styles.parallax_imageList} list-items`}>
            {imagesList}
          </ul>
        )}
      </div>
      <AnimateElement>
        <div className="divider" data-cursor="-inverse">
          <div className={styles.about}>
            <div className={styles.image}>
              <LazyLoadImage
                src="https://cuberto.com/assets/about/screenshot/2.jpg"
                alt="A digital workspace screenshot"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.texts}>
                <h3 className={styles.heading}>
                  We develop high-quality digital experiences that elevate your brand into the future, backed by creativity and strategy.
                </h3>
                <p className={styles.paragraph}>
                  At SHI Studio, we believe in the power of creativity and innovation. Our team of talented professionals is dedicated to crafting exceptional digital experiences that resonate with your audience.
                </p>
                <p className={styles.paragraph}>
                We don't just create designs; we build connections that elevate your brand and drive meaningful results. With a harmonious blend of strategy and artistry, we bring your vision to life, ensuring every project is as unique as your business. Join us on this exciting journey and let’s shape the future together.
                </p>
              </div>
              <AnimatedButton
                className="mb-0"
                text="How can we help?"
                mode="dark"
                link="/services"
              />
            </div>
          </div>
        </div>
      </AnimateElement>
    </div>
  );
};

export default CollaborateToInnovate;
