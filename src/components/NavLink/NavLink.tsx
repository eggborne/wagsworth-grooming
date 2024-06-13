import styles from "./NavLink.module.css";

interface NavLinkProps {
  label: string;
  href: string;
  selected: boolean;
};

const NavLink = ({ label, selected }: NavLinkProps) => {
  return (
    <li className={styles.navLink + (selected ? ' ' + styles.selected : '')}>
      <div className={styles.label}
        style={{ fontSize: `${label.length > 10 ? '1rem' : '1.2rem'}` }}
      >{label}</div>
      <div className={styles.boneContainer}>
        <div className={styles.boneKnob}></div>
        <div className={styles.boneKnob}></div>
        <div className={styles.boneKnob}></div>
        <div className={styles.boneKnob}></div>
      </div>
    </li>
  );
};

export default NavLink;