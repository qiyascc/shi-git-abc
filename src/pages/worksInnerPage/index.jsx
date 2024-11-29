import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from "@/components/app/header";
import WorkOverview from "@/components/app/workOverview";
import WorkInfoSection from "@/components/app/workInfoSection";
import WorksView from "@/components/app/worksView";
import OurGoal from "@/components/app/ourGoalSection";
import SeeMoreWorks from "@/components/app/seeMoreWorks";
import GetInTouchSection from "@/components/app/getInTouchSection";
import { useWorkInfoData, workInfoCommon } from '@/constants/constant';

const WorksInnerPage = () => {
  const { id } = useParams();
  const { workInfoData, isLoading, error } = useWorkInfoData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log({workInfoData})
  const currentWork = workInfoData.find(work => work.id.toString() === id);

  if (!currentWork) {
    return <div>Work not found</div>;
  }
  console.log("asasasa", currentWork  )


  return (
    <>
      <Helmet>
        <title>{currentWork.title} | SHI Studio</title>
        <meta name="description" content={`SHI Studio - ${currentWork.description}`} />
      </Helmet>
      
      <div className="divider">
        <Header />
        <WorkOverview title={currentWork.title} short_description={currentWork.short_description} image={currentWork.image} />

        <WorkInfoSection 
          title={currentWork.title}
          viewFullSiteLink={currentWork.project_url}
          viewFullSiteText={workInfoCommon.viewFullSiteText}
          description={currentWork.description}
          short_description={currentWork.short_descriptiondescription}
          behanceLink={currentWork.project_behance_url}
          projectDetails={[
            { title: "Year", content: currentWork.year },
            { title: "Client", content: currentWork.client },
            { title: "Industry", content: currentWork.industry },
            { title: "Services", content: currentWork.tags.map(tag => tag.name).join(", ") },
            { title: "Collaborators", content: currentWork.collaborators.join(", ") },
          ]}
        />

        <WorksView
          primaryImage={currentWork.primaryImage}
          childImageOne={currentWork.childImageOne}
          childImageTwo={currentWork.childImageTwo}
          childImageThree={currentWork.childImageThree}
        />

        <OurGoal
          goalName="Product goal and objectives"
          goalContent={currentWork.description}
          statistics={false}
        />

        <WorksView
          primaryImage="/images/works-image-1.jpeg"
          childImageOne="/images/works-image-2.png"
          childImageTwo="/images/works-image-3.png"
        />
        <SeeMoreWorks />
        <GetInTouchSection />
      </div>
    </>
  );
};

export default WorksInnerPage;

