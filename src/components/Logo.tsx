import styles from './Logo.module.css';

type LogoProps = {
  // Define any props here if needed
};

const Logo = (props: LogoProps) => {
  return (
    <div className={styles.logo}>
      <img src={"/logo/wagsworth.png"} className={styles.wagsworth} />
      <img src={"/logo/grooming.png"} className={styles.grooming} />
      <img src={"/logo/doghead.png"} className={styles.doghead} />
      <img src={"/logo/monocle.png"} className={styles.monocle} />
    </div>
  );
};

export default Logo;