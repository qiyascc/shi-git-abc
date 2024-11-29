import BehanceLogo from "@/assets/BehanceLogo";
import InstagramLogo from "@/assets/InstagramLogo";
import LinkedinLogo from "@/assets/LinkedinLogo";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./memberCard.module.scss";
import AnimateElement from "@/components/ui/AnimateElement";
import { LazyLoadImage } from "react-lazy-load-image-component";

const componentMap = {
  LinkedinLogo: <LinkedinLogo fill="black" />,
  BehanceLogo: <BehanceLogo fill="black" />,
  InstagramLogo: <InstagramLogo fill="black" />,
};

const MemberCard = ({ id, profile_img, name, profession, social_media }) => {
  return (
    <AnimateElement className="translate-y-20">
      <div key={id} className={styles.card}>
        <LazyLoadImage
          src={profile_img}
          alt={`${name}'s profile`}
          className="rounded-xl"
        />
        <div className="mt-8">
          <h3 className="text-[32px] mb-3">{name}</h3>
          <p className="text-2xl font-helvetica_light mb-7">{profession}</p>
          <div className="flex gap-3 items-center flex-wrap">
            {social_media.map((social, index) => (
              <Link
                key={index}
                to={social.path}
                className={styles.social_media_links}
              >
                {componentMap[social.component]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AnimateElement>
  );
};

MemberCard.propTypes = {
  id: PropTypes.number,
  profile_img: PropTypes.string,
  name: PropTypes.string,
  profession: PropTypes.string,
  social_media: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      social_media_links: PropTypes.string,
      component: PropTypes.string,
    })
  ),
};

export default MemberCard;
