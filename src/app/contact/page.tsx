import styles from "./page.module.css";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { ContactData, ContactInfo, ImageMetadata } from "@/types";
import Image from "next/image";
import Footer from "@/components/Footer";
import ContactIcons from "@/components/ContactIcons/ContactIcons";
import { militaryToStandardTime } from "@/scripts/util";
import classNames from "classnames";
import { getSiteData } from "@/scripts/api";

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Contact = async () => {
  const [sectionData, contactInfo, socialImages] = await Promise.all([
    getSiteData<ContactData>('WagsworthSiteID', 'liveData/sections/contact'),
    getSiteData<ContactInfo>('WagsworthSiteID', 'liveData/contactInfo'),
    getSiteData<Record<string, ImageMetadata>>('WagsworthSiteID', 'liveData/images/socialLinks'),
  ]);

  const hoursArray = Object.values(contactInfo.hours).map((hours, h) => {
    return {
      day: Object.keys(contactInfo.hours)[h],
      hours: {
        open: militaryToStandardTime(hours.open),
        close: militaryToStandardTime(hours.close)
      }
    }
  }).sort((a, b) => weekdays.indexOf(a.day) - weekdays.indexOf(b.day));

  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802.4316632155715!2d-122.76598602364282!3d45.38046253902183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549573e564760e1d%3A0x7f030423f7eda2b1!2sWagsworth%20Grooming!5e0!3m2!1sen!2sus!4v1718181057447!5m2!1sen!2sus`;

  return (
    <main>
      <div className={styles.contactSection}>
        {sectionData.bannerImage &&
          <div className={'bannerImage'}>
            <Image
              fill
              src={sectionData.bannerImage.url}
              alt={sectionData.label}
            />
          </div>
        }
        <div className={styles.topArea}>
          <div className={styles.contactInfo}>
            <ContactIcons
              contactInfo={contactInfo}
              expanded={true}
              scrolled={false}
              embedded={true}
            />
            <address>
              {contactInfo.streetAddress.map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </address>
          </div>
        </div>
        <div className={styles.hoursInfo + ' shadowed-border'}>
          <h2>Hours of Operation</h2>
          {hoursArray.map(({ day, hours }, d) => {
            const dayClasses = classNames(
              styles.dayDisplay,
              { [styles.today]: d === new Date().getDay() }
            )
            return (
              <div className={dayClasses} key={d}>
                <div>{day}</div>
                <div>{hours.open ? `${hours.open} - ${hours.close}` : `closed`}</div>
              </div>
            )
          })}
        </div>
        <div className={styles.googleMapFrame}>
          <h2>Find us</h2>
          <iframe src={googleMapsUrl} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='google-map'></iframe>
        </div>
        <SocialLinks socialImages={socialImages} />
        <Footer />
      </div>
    </main>
  );
}

export default Contact;