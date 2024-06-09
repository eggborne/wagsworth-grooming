import { fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";
import QuestionSet from "@/components/QuestionSet/QuestionSet";

const FAQs = async () => {

  const sectionData = await fetchPageData('sections/faqs');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <div className={styles.faqsSection}>
        {'questions' in sectionData && sectionData.questions.map(({question, answer}, i) => (
          <QuestionSet key={i} question={question} answer={answer} />
        ))}
      </div>
    </main>
  );
}

export default FAQs;