import styles from "./page.module.css";
import QuestionSet from "@/components/QuestionSet/QuestionSet";
import BorderedSection from "@/components/BorderedSection/BorderedSection";
import { FAQsData } from "@/types";
import { getSiteData } from "@/scripts/api";
import Image from "next/image";

const FAQs = async () => {

  const sectionData = await getSiteData<FAQsData>('WagsworthSiteID', 'liveData/sections/faqs');

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <Image fill src={sectionData.bannerImage.url} alt={sectionData.label} />
      </div>}
      <h1>{sectionData.label}</h1>
      <div className={styles.faqList}>
        {sectionData.questions.map(({ headline, bodyText }, i) => (
          <QuestionSet key={i} question={headline} answer={bodyText} />
        ))}
      </div>
    </BorderedSection>
  );
}

export default FAQs;