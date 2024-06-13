import { fetchPageData } from "@/scripts/db";
import QuestionSet from "@/components/QuestionSet/QuestionSet";

const FAQs = async () => {

  const sectionData = await fetchPageData('sections/faqs');

  return (
    <main>
      <div className={`borderedSectionContainer`}>
        <div className={`borderedSection`}>
          <h1>{'label' in sectionData && sectionData.label}</h1>
            {'questions' in sectionData && sectionData.questions.map(({ question, answer }, i) => (
              <QuestionSet key={i} question={question} answer={answer} />
            ))}
        </div>
      </div>
    </main>
  );
}

export default FAQs;