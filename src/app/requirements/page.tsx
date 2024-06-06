import { fetchSiteData } from "../../../firebase";
import styles from "./page.module.css";

const Requirements = async () => {

  const sectionData = await fetchSiteData('sections/2');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <div className={'section ' + styles.requirementsSection}>
        {'requirements' in sectionData && sectionData.requirements.map(({headline, bodyText}, i) => (
          <div key={i}>
            <h2 className={styles.headline}>{headline}</h2>
            <div className={styles.bodyText} key={i}>
              {bodyText.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Requirements;