import { ImageData } from '@/types/sections';
import styles from './Logo.module.css';
import Image from 'next/image';
import { fetchImageData } from '../../../firebase';

type LogoProps = {
  logoImages: ImageData[],
}

const Logo = ({ logoImages }: LogoProps) => {
    
  console.log('Logo rendered');
  return (
    <div className={styles.logo}>
      <Image priority fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Wagsworth" src={logoImages[3].url} className={styles.wagsworth} />
      <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="dog head" src={logoImages[0].url} className={styles.doghead} />
      <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="grooming" src={logoImages[1].url} className={styles.grooming} />
      <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="monocle" src={logoImages[2].url} className={styles.monocle} />
    </div>
  );
};

export default Logo;