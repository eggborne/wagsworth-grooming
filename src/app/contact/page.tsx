import { fetchSiteData } from "../../../firebase";
import styles from "./page.module.css";

const Contact = async () => {

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

export default Contact;