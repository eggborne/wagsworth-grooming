import { fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";

const About = async () => {

  const sectionData = await fetchPageData('/sections/about');

  return (
    <main>
      <h1>{sectionData.label}</h1>
      <div className={'section ' + styles.aboutSection}>
        {'textContent' in sectionData && sectionData.textContent.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}

export default About;