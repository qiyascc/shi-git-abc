import GetInTouchSection from "@/components/app/getInTouchSection";
import Header from "@/components/app/header";
import OurWorkflow from "@/components/app/ourWorkflow";
import PartnershipSection from "@/components/app/partnershipSection";
import PlansSection from "@/components/app/plansSection";
import ServicesSection from "@/components/app/servicesSection";
import { Helmet } from "react-helmet";

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | SHI Studio</title>
        <meta name="description" content="SHI Studio - Services page" />
      </Helmet>
      <div className="services divider">
        <Header />
        <ServicesSection mode="light" showSeeAll={false} />
        <PlansSection mode="dark" />
        <OurWorkflow />
        <PartnershipSection buttonText="Get started" />
        <GetInTouchSection />
      </div>
    </>
  );
};

export default Services;
