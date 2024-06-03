import { fetchSiteData, fetchUrlsFromStorage } from "@/scripts/db";
import styles from "./page.module.css";

const About = async () => {

  const sectionData = await fetchSiteData('sections/1');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <div className={styles.section}>
        {'textContent' in sectionData && sectionData.textContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}

export default About;