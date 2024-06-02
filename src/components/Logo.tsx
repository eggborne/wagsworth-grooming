import styles from './Logo.module.css';

const basePath = 'wagnew';

type LogoProps = {
  // Define any props here if needed
};

const Logo = (props: LogoProps) => {
  return (
    <div className={styles.logo}>
      <img src={basePath + "/logo/wagsworth.png"} className={styles.wagsworth} />
      <img src={basePath + "/logo/grooming.png"} className={styles.grooming} />
      <img src={basePath + "/logo/doghead.png"} className={styles.doghead} />
      <img src={basePath + "/logo/monocle.png"} className={styles.monocle} />
    </div>
  );
};

export default Logo;