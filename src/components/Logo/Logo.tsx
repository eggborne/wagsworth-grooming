import { ImageData } from '@/types/sections';
import styles from './Logo.module.css';

type LogoProps = {
  logoImages: ImageData[],
}

const Logo = ({ logoImages }: LogoProps) => {
  console.log('Logo rendered');
  return (
    <div className={styles.logo}>
      {logoImages &&
        <>
          <img src={logoImages[0].url} className={styles.doghead} />
          <img src={logoImages[1].url} className={styles.grooming} />
          <img src={logoImages[2].url} className={styles.monocle} />
          <img src={logoImages[3].url} className={styles.wagsworth} />
        </>
      }
    </div>
  );
};

export default Logo;