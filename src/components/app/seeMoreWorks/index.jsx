import PropTypes from "prop-types";
import WorkCard from "../workCard";
import AnimatedButton from "@/components/ui/animatedButton";
import { works } from "@/constants/constant";
import MainTitle from "@/components/ui/MainTitle";
const SeeMoreWorks = ({ showSeeAll = true }) => {
  return (
    <div className="shi-container wrapper">
      <div className="main_title">
        <MainTitle title="See more projects" subtitle=" " />
        {showSeeAll && (
          <AnimatedButton mode="light" link="/works" text="See All" />
        )}
      </div>

      <div className="min-w-[200px] overflow-hidden">
        <div className="min-w-[652px] overflow-x-auto">
          <div className={`flex items-center md:gap-6 gap-4 my-8 md:my-12 `}>
            {[0, 1].map((colIndex) => (
              <div key={colIndex} className={`flex flex-col gap-6`}>
                {works.slice(2, 3).map((work) => (
                  <WorkCard
                    key={work.id}
                    id={work.id}
                    image={work.image}
                    title={work.login}
                    imageClassName={"h-[327px] md:h-[420px] lg:h-[477px]"}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

SeeMoreWorks.propTypes = {
  showSeeAll: PropTypes.bool,
};

export default SeeMoreWorks;
