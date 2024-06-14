import { ContactInfo } from '@/types/sections';
import styles from './ContactIcons.module.css';
import Link from 'next/link';
import Image from 'next/image';

type ContactIconsProps = {
  contactInfo: ContactInfo,
  expanded: boolean,
  scrolled: boolean,
}

const ContactIcons = ({ contactInfo, expanded, scrolled }: ContactIconsProps) => {
  const contactIconsClasses = styles.contactIcons + ` ${expanded ? styles.expanded : ''} ${scrolled ? styles.scrolled : ''}`;
  return (
    <div className={contactIconsClasses}>
      <Link href={`tel:+1-${contactInfo.phone}`}>
        <Image
          src={'phoneicon.svg'}
          alt={'phone icon'}
          width={32}
          height={32}
          className={styles.icon}
        />
        <div className={styles.contactDetail + ' ' + styles.phone}>{`(${contactInfo.phone.slice(0, 3)})-${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6, 10)}`}</div>
      </Link>
      <Link href={`mailto:${contactInfo.email}`}>
        <Image
          src={'emailicon.svg'}
          alt={'phone icon'}
          width={32}
          height={32}
          className={styles.icon}
        />
        <div className={styles.contactDetail + ' ' + styles.email}>booking<br />@wagsworthgrooming.com</div>
      </Link>
    </div>
  )
}

export default ContactIcons;