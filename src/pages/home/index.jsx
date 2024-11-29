import ContactSection from "@/components/app/contactSection";
import Header from "@/components/app/header";
import MainSection from "@/components/app/mainSection";
import PartnershipsSlider from "@/components/app/partnershipsSlider";
import PlansSection from "@/components/app/plansSection";
import ServicesSection from "@/components/app/servicesSection";
import WorkingProcess from "@/components/app/workingProcess";
import WorksSection from "@/components/app/worksSection";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SHI Studio</title>
        <meta name="description" content="SHI Studio - Home page" />
      </Helmet>
      <div className="home divider">
        <Header />
        <MainSection />
        <WorksSection />
        <ServicesSection />
        <WorkingProcess />
        <PlansSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
