import { fetchSiteData } from "@/scripts/db";
import styles from "./page.module.css";

const Requirements = async () => {

  const sectionData = await fetchSiteData('sections/2');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <div className={'section ' + styles.requirementsSection}>
        {'requirements' in sectionData && sectionData.requirements.map(({headline, bodyText}, i) => (
          <>
            <h2>{headline}</h2>
            <div key={i}>
              {bodyText.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </>
        ))}
      </div>
    </main>
  );
}

export default Requirements;