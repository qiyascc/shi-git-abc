import { Outlet } from "react-router-dom";
import MainTitle from "../ui/MainTitle";
import ContactNavbar from "../app/contactNavbar";
import Header from "../app/header";

const ContactLayout = () => {
  return (
    <div className="contact divider">
      <Header />
      <section className="wrapper mt-8 lg:mt-16">
        <MainTitle subtitle="Ready to transform" title="your business?" />

        <div className="flex flex-col lg:flex-row items-start justify-between lg:mt-6">
          <ContactNavbar />

          <div className="w-full min-h-[50vh]">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactLayout;
