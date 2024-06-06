import { FirebaseData, Section } from "@/types/sections";
import styles from "./page.module.css";
import { fetchSiteData } from "../../../firebase";

const About = async () => {

  const sectionData = await fetchSiteData('/sections/1')

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <div className={'section ' + styles.aboutSection}>
        {'textContent' in sectionData && sectionData.textContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}

export default About;