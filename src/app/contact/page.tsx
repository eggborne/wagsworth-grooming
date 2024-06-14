import { fetchContactInfo, fetchImageMetadata, fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { ContactData } from "@/types/sections";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";

const Contact = async () => {

  const [sectionData, contactInfo, socialImages] = await Promise.all([
    fetchPageData('sections/contact') as Promise<ContactData>,
    fetchContactInfo(),
    fetchImageMetadata('socialLinks')
  ]);

  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.4316632155715!2d-122.76598602364282!3d45.38046253902183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549573e564760e1d%3A0x7f030423f7eda2b1!2sWagsworth%20Grooming!5e0!3m2!1sen!2sus!4v1718181057447!5m2!1sen!2sus`;

  return (
    <main>
      <div className={styles.contactSection}>
        {sectionData.bannerImage &&
          <div className={styles.bannerImage}>
            <Image
              fill
              src={sectionData.bannerImage.url}
              alt={sectionData.label}
            />
          </div>}
        <h1>{sectionData.label}</h1>
        <div className={styles.contactInfo}>
          <p>
            <Link href={`tel:+1-${contactInfo.phone}`}>
              {`(${contactInfo.phone.slice(0, 3)})-${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6, 10)}`}
            </Link>
          </p>
          <p>
            <Link href={`mailto:${contactInfo.email}`}>
              {contactInfo.email.split('@')[0]}<br />
              @{contactInfo.email.split('@')[1]}
            </Link>
          </p>
        </div>
        <address>
          {contactInfo.streetAddress.map((line, index) => (
            <span key={index}>{line}<br /></span>
          ))}
        </address>
        <iframe className={styles.googleMapFrame} src={googleMapsUrl} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='google-map'></iframe>
        <SocialLinks socialImages={socialImages} />
        <Footer />
      </div>
    </main>
  );
}

export default Contact;