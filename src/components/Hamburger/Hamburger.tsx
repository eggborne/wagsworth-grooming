import styles from './Hamburger.module.css';

type  HamburgerProps = {
  onClick: (open: boolean) => void;
  open: boolean;
};

const Hamburger = ({ onClick, open }: HamburgerProps) => {
  return (
    <div onClick={() => onClick(!open)} className={styles.hamburger + ' ' + (open ? styles.open : '')}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
};

export default Hamburger;