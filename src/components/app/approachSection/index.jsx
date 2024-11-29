import AnimateElement from "@/components/ui/AnimateElement";
import MainTitle from "@/components/ui/MainTitle";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Approach = () => {
  return (
    <div className="shi-container wrapper">
      <MainTitle
        subtitle="Digital design studio with a"
        title="result-driven approach"
      />
      <AnimateElement>
        <div className="h-[672px] mt-16">
          <LazyLoadImage
            alt="Approach Image"
            src="/images/approach-img.jpeg"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </AnimateElement>
    </div>
  );
};

export default Approach;
