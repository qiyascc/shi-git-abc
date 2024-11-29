import GetInTouchSection from "@/components/app/getInTouchSection";
import Header from "@/components/app/header";
import WorksEntranceSection from "@/components/app/worksEntranceSection";
import { Helmet } from "react-helmet";

const Works = () => {
  return (
    <>
      <Helmet>
        <title>Works | SHI Studio</title>
        <meta name="description" content="SHI Studio - Works page" />
      </Helmet>
      <div className="works divider">
        <Header />
        <WorksEntranceSection />
        <GetInTouchSection />
      </div>
    </>
  );
};

export default Works;
