import { useState } from 'react';
import styles from './Hamburger.module.css';

type  HamburgerProps = {
  onClick: (open: boolean) => void;
  open: boolean;
};

const Hamburger = ({ onClick, open }: HamburgerProps) => {
  const [transitioning, setTransitioning] = useState('');
  const handleClick = () => {
    setTransitioning(open ? 'unfolding' : 'folding');
    setTimeout(() => {
      setTransitioning('');
      onClick(!open);
    }, 125);

  };

  return (
    <div onClick={handleClick} className={styles.hamburger + (transitioning ? ' ' + styles.opening : '') + ((open && !transitioning) ? ' ' + styles.open : '')}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
};

export default Hamburger;