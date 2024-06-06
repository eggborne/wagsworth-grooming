import styles from './Logo.module.css';

type LogoProps = {
  logoUrls: string[],
}

const Logo = ({ logoUrls }: LogoProps) => {
  console.log('Logo rendered');
  return (
    <div className={styles.logo}>
      {logoUrls &&
        <>
          <img src={logoUrls[0]} className={styles.doghead} />
          <img src={logoUrls[1]} className={styles.grooming} />
          <img src={logoUrls[2]} className={styles.monocle} />
          <img src={logoUrls[3]} className={styles.wagsworth} />
        </>
      }
    </div>
  );
};

export default Logo;