import PropTypes from "prop-types";
import styles from "./workCard.module.scss";
import { Link } from "react-router-dom";
import AnimateElement from "@/components/ui/AnimateElement";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WorkCard = ({
  id,
  image,
  tags,
  description,
  badges,
  title,
  imageClassName,
  hoverImage,
}) => {
  return (
    <AnimateElement className="translate-y-16">
      <Link to={`/works/${id}`}>
        <div className={`${styles.card}`}>
          <div className={styles["card-inner"]}>
            <div className={`${styles.image} ${imageClassName}`}>
              <LazyLoadImage src={image} alt={title} />
              <LazyLoadImage
                src={hoverImage || image}
                alt={title}
                className={`${styles.hoverImage}`}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={`${styles["tags"]}`}>
              {tags?.map((tag) => (
                <div className={styles.tag} key={tag.id}>
                  {tag.name}
                </div>
              ))}
            </div>
            <div className={`${styles.badges}`}>
              {badges?.map((badge) => (
                <div
                  key={badge.id}
                  className={styles.badge}
                  dangerouslySetInnerHTML={{ __html: badge.image }}
                />
              ))}
            </div>  
          </div>
        </div>
      </Link>
    </AnimateElement>
  );
};

WorkCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  hoverImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  imageClassName: PropTypes.string,
};

export default WorkCard;
