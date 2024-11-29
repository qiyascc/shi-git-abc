import BehanceLogo from "@/assets/BehanceLogo";
import FacebookLogo from "@/assets/FacebookLogo";
import LinkedinLogo from "@/assets/LinkedinLogo";
import TelegramLogo from "@/assets/TelegramLogo";
import WhatsappLogo from "@/assets/WhatsappLogo";
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import {
  navigationFooterList,
  ourServicesList,
  socialMediaList,
} from "@/constants/constant";
import InstagramLogo from "@/assets/InstagramLogo";
import { forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const componentMap = {
  LinkedinLogo: <LinkedinLogo fill="white" />,
  BehanceLogo: <BehanceLogo fill="white" />,
  WhatsappLogo: <WhatsappLogo fill="white" />,
  InstagramLogo: <InstagramLogo fill="white" />,
  FacebookLogo: <FacebookLogo fill="white" />,
  TelegramLogo: <TelegramLogo fill="white" />,
};

const Footer = forwardRef((props, ref) => {
  return (
    <footer className="pt-1 lg:pt-3 pb-1 footer px-1 md:pb-3 md:px-3" ref={ref}>
      <div className="grid grid-cols-12 gap-3 max-lg:gap-1">
        <div
          data-cursor="-inverse"
          className="col-span-4 max-lg:col-span-12 bg-primary rounded-3xl py-6 px-9  max-lg:flex flex-col"
        >
          <div
            className={`flex max-lg:order-2 max-lg:pt-6 flex-wrap gap-3 ${styles.social_media_container}`}
          >
            {socialMediaList.map((item, i) => (
              <Link to={item.link} className={styles.social_media_link} key={i}>
                {componentMap[item.element]}
              </Link>
            ))}
          </div>
          <h4 className="text-4xl max-lg:order-1 text-white font-helvetica_light">
            SHI Studio
          </h4>
          <p className="max-lg:order-3 text-white font-helvetica_thin text-[18px] pt-6 leading-normal">
            We’re a design agency focused on empowering startups, B2B and
            fintech companies with a impactful online presence.
          </p>
        </div>
        <div
          data-cursor="-inverse"
          className="col-span-8 max-lg:col-span-12 bg-primary rounded-3xl text-white px-9 py-8 flex flex-col justify-between"
        >
          <div className="flex items-start justify-between flex-wrap gap-x-10 max-lg:gap-y-12">
            <div>
              <div>
                <h5 className={styles.footer_nav_title}>Navigation</h5>
                <ul>
                  {navigationFooterList.map((item) => (
                    <li key={item.name} className="pb-4">
                      <Link
                        to={item.path}
                        className={`${styles.footer_nav_link}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div>
                <h5 className={styles.footer_nav_title}>Our services</h5>
                <ul>
                  {ourServicesList.map((item) => (
                    <li key={item.name} className="pb-4">
                      <Link
                        to={item.path}
                        className={`${styles.footer_nav_link}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div>
                <h5 className={styles.footer_nav_title}>Contact</h5>
                <ul>
                  <li className={`pb-4 ${styles.footer_nav_link}`}>
                    <a href="mailto:hello@studio.shi">hello@studio.shi</a>
                  </li>

                  <li className={`pb-4 ${styles.footer_nav_link}`}>
                    <a href="tel:+994511234567">+994 51 123 45 67</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:border-t lg:border-t-divider lg:pt-7 lg:mt-9">
            <div className="flex items-center justify-between">
              <p className="font-helvetica_light text-xl">
                © SHI studio.
                <span className="text-gray"> All rights reserved</span>
              </p>
              <span className="font-helvetica_thin text-4xl">2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
