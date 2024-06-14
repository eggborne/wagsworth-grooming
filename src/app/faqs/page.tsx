import { fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";
import QuestionSet from "@/components/QuestionSet/QuestionSet";
import BorderedSection from "@/components/BorderedSection/BorderedSection";
import { FAQsData } from "@/types/sections";

const FAQs = async () => {

  const sectionData = await fetchPageData('sections/faqs') as FAQsData;

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <img src={sectionData.bannerImage.url} alt={sectionData.label} />
      </div>}
      <h1>{sectionData.label}</h1>
      <div className={styles.faqList}>        
        {sectionData.questions.map(({ question, answer }, i) => (
          <QuestionSet key={i} question={question} answer={answer} />
        ))}
      </div>
    </BorderedSection>
  );
}

export default FAQs;