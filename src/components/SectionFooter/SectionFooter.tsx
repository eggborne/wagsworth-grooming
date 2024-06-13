import { NavItem } from '@/types/sections';
import styles from './SectionFooter.module.css';
import Link from 'next/link';

type SectionFooterProps = {
  navInfo: NavItem,
  showing: boolean,
}


const SectionFooter = ({ navInfo, showing }: SectionFooterProps) => {

  return (
    <div className={styles.sectionFooter + (showing ? ' ' + styles.showing : '')} >
      <Link href={navInfo.href}>
        <div className={styles.downArrow}>
          <div className={'caret'}></div>
          <div className={styles.arrowLabel}>{navInfo.label}</div>
        </div>
      </Link>
    </div>
  )
}

export default SectionFooter;