import { fetchContactInfo, fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";

const Contact = async () => {

  const [sectionData, contactInfo] = await Promise.all([
    fetchPageData('sections/contact'),
    fetchContactInfo(),
  ]);

  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.4316632155715!2d-122.76598602364282!3d45.38046253902183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549573e564760e1d%3A0x7f030423f7eda2b1!2sWagsworth%20Grooming!5e0!3m2!1sen!2sus!4v1718181057447!5m2!1sen!2sus`;

  return (
    <main>
      {/* <h1>{'label' in sectionData && sectionData.label}</h1> */}
      {'phone' in sectionData && <div className={'section ' + styles.contactSection}>
        <address>
          {contactInfo.streetAddress.map((line, index) => (
            <span key={index}>{line}<br /></span>
          ))}
        </address>

        <iframe className={styles.googleMapFrame} src={googleMapsUrl} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='google-map'></iframe>

      </div>}
    </main>
  );
}

export default Contact;