import { fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";

const Contact = async () => {

  const sectionData = await fetchPageData('sections/contact');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      {'phone' in sectionData && <div className={'section ' + styles.contactSection}>
        <p>Phone: {sectionData.phone}</p>
        <p>Email: <a href={`mailto:${sectionData.email}`}>{sectionData.email}</a></p>
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