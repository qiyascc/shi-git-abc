import styles from "./contactSection.module.scss";
import RotateArrow from "@/assets/RotateArrow";
import AnimateElement from "@/components/ui/AnimateElement";
import MainTitle from "@/components/ui/MainTitle";
import { contactData } from "@/constants/constant";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="wrapper">
      <div className="flex items-start justify-between flex-col md:flex-row max-md:gap-12">
        <div className="lg:w-2/4 w-full">
          <MainTitle subtitle="How can" title="we help?" />
        </div>

        <div className="lg:w-2/4 w-full">
          <AnimateElement>
            <ul>
              {contactData.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/contact${item.link}`}
                    className={styles.contact_link}
                  >
                    <span className="text-xl max-md:text-[18px]">
                      {item.text}
                    </span>
                    <div className={styles.arrow}>
                      <RotateArrow />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </AnimateElement>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
