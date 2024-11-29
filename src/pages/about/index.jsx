import Approach from "@/components/app/approachSection";
import CollaborateToInnovate from "@/components/app/collaborateToInnovate";
import ContactSection from "@/components/app/contactSection";
import Header from "@/components/app/header";
import LeaderSection from "@/components/app/leaderSection";
import OurGoal from "@/components/app/ourGoalSection";
import PartnershipSection from "@/components/app/partnershipSection";
import TeamCardsSection from "@/components/app/teamCardsSection";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | SHI Studio</title>
        <meta name="description" content="SHI Studio - About page" />
      </Helmet>
      <div className="about">
        <div className="divider">
          <Header />
          <Approach />
          <OurGoal
            goalName="Our goal"
            goalContent="From the moment our company was founded, we have helped our clients find exceptional solutions for their businesses, creating memorable brands and digital products. Our accumulated experience empowers us to develop products exactly as they should be."
            statistics={true}
          />
          <PartnershipSection buttonText="Become our partner" />
        </div>
        <CollaborateToInnovate />
        <div className="divider">
          <LeaderSection />
          <TeamCardsSection />
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default About;
