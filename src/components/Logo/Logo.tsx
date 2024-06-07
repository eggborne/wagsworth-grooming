import { ImageData } from '@/types/sections';
import styles from './Logo.module.css';
import Image from 'next/image';

type LogoProps = {
  logoImages: ImageData[],
}

const Logo = ({ logoImages }: LogoProps) => {
  console.log('Logo rendered');
  return (
    <div className={styles.logo}>
      <Image fill alt="logo" src={logoImages[0].url} className={styles.doghead} />
      <Image fill alt="logo" src={logoImages[1].url} className={styles.grooming} />
      <Image fill alt="logo" src={logoImages[2].url} className={styles.monocle} />
      <Image fill alt="logo" src={logoImages[3].url} className={styles.wagsworth} />
    </div>
  );
};

export default Logo;