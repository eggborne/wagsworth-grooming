import { ImageMetadata } from '@/types/sections';
import styles from './Logo.module.css';
import Image from 'next/image';
import classNames from 'classnames';

type LogoProps = {
  logoImages: Record<string, ImageMetadata>,
  revealed: boolean,
}

const Logo = ({ logoImages, revealed }: LogoProps) => {
  const logoClasses = classNames([
    styles.logo,
    {
      [styles.revealed]: revealed       
    }
  ]);

  return (
    <div className={logoClasses}>
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