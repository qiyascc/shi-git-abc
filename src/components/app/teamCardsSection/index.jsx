import MainTitle from "@/components/ui/MainTitle";
import AnimatedButton from "@/components/ui/animatedButton";
import MemberCard from "../memberCard";
import { teamList } from "@/constants/constant";
import styles from "./teamCardsSection.module.scss";

const TeamCardsSection = () => {
  return (
    <>
      <section className="wrapper">
        <div>
          <div className="flex items-start sm:items-end justify-between flex-col gap-6 sm:flex-row">
            <MainTitle
              subtitle="Discover the creative minds"
              title="fuelling our studio"
            />
            <AnimatedButton link="/contact/join-our-team" text="Join our team" />
          </div>
          <div className={styles.team_cards}>
            {teamList.map((item, index) => (
              <MemberCard {...item} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamCardsSection;
