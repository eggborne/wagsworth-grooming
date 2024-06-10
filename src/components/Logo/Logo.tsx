import { ImageData, ImageMetadata } from '@/types/sections';
import styles from './Logo.module.css';
import Image from 'next/image';

type LogoProps = {
  logoImages: Record<string, ImageMetadata>,
}

const Logo = ({ logoImages }: LogoProps) => {
  return (
    <div className={styles.logo}>
      {Object.values(logoImages).map((image, i) => (
        <Image
          fill
          key={i}
          src={image.url}
          priority
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 20vw"
          alt={image.alt}
          className={styles[Object.keys(logoImages)[i]]}
        />
      ))}
    </div>
  );
};

export default Logo;