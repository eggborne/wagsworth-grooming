import { fetchSiteData } from "@/scripts/db";
import styles from "./page.module.css";

const About = async () => {

  const sectionData = await fetchSiteData('sections/4');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      {'phone' in sectionData && <div className={'section ' + styles.contactSection}>
        <p>Phone: {sectionData.phone}</p>
        <p>Email: {sectionData.email}</p>
        <p>Address:</p>
        <address>
          {sectionData.address.map((line, index) => (
            <span key={index}>{line}<br /></span>
          ))}
        </address>

      </div>}
    </main>
  );
}

export default About;