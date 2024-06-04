import { fetchSiteData } from "@/scripts/db";
import styles from "./page.module.css";

const FAQs = async () => {

  const sectionData = await fetchSiteData('sections/3');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <div className={'section ' + styles.faqsSection}>
        {'questions' in sectionData && sectionData.questions.map(({question, answer}, i) => (
          <>
            <h2>{question}</h2>
            <div key={i}>
              {answer.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </>
        ))}
      </div>
    </main>
  );
}

export default FAQs;