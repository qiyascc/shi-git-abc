import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import WorkCard from "@/components/app/workCard";
import Loader from "@/components/ui/Loader";
import MainTitle from "@/components/ui/MainTitle";
import { categories, useWorkInfoData } from "@/constants/constant";

const WorksEntranceSection = () => {
  const buttons = useRef([]);
  const [activeCategoryId, setActiveCategoryId] = useState(1);
  const [limit, setLimit] = useState(4);
  const { workInfoData, isLoading, error } = useWorkInfoData();

  const handleCategoryClick = useCallback((id) => {
    setActiveCategoryId(id);
  }, []);

  useEffect(() => {
    const elements = buttons.current;

    elements.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          translateY: "0%",
          opacity: 1,
          duration: index * 0.1 + 0.3,
          ease: "power1.out",
        });
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el && el.scrollTrigger) {
          el.scrollTrigger.kill();
        }
      });
    };
  }, []);

  const loadMore = useCallback(() => {
    setLimit((prevLimit) => prevLimit + 4);
  }, []);

  const displayedItems = useMemo(() => {
    return workInfoData.slice(0, limit);
  }, [workInfoData, limit]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="shi-container">
      <div className="wrapper">
        <MainTitle
          subtitle="Branded Experiences"
          title="that grow your business"
        />
      </div>

      <div
        className="categories mt-6 flex gap-4 overflow-x-auto pl-3 pr-4 md:pl-9 -mx-1 md:mx-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`border py-3 px-6 rounded-[20px] transition-all ease-custom duration-300 shrink-0 opacity-0 translate-y-10 ${
              activeCategoryId === category.id
                ? "bg-primary text-white"
                : "text-gray-60 border-[#D4D6D6] md:hover:bg-gray_light"
            }`}
            ref={(el) => (buttons.current[index] = el)}
            data-cursor={activeCategoryId === category.id ? "-inverse" : ""}
          >
            {category.title}
          </button>
        ))}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper min-h-screen">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-12`}>
            {Array.from({ length: Math.ceil(displayedItems.length / 2) }, (_, colIndex) => (
              <div key={colIndex} className={`flex flex-col gap-6`}>
                {displayedItems
                  .slice(colIndex * 2, colIndex * 2 + 2)
                  .map((work, index) => (
                    <WorkCard
                      key={work.id}
                      {...work}
                      image={`https://shi.studio/api/v1/media/${work.image}/path`}
                      imageClassName={
                        (colIndex + index) % 2 === 1
                          ? "h-[327px] md:h-[420px] lg:h-[624px]"
                          : "h-[327px] md:h-[420px] lg:h-[477px]"
                      }
                    />
                  ))}
              </div>
            ))}
          </div>
          {displayedItems.length < workInfoData.length && (
            <button onClick={loadMore} className="load_animation down">
              <span className="pb-[1px]">Load more</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 4.16699V15.8337M10 15.8337L5 10.8337M10 15.8337L15 10.8337"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WorksEntranceSection;

