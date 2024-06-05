import styles from "./NavLink.module.css";

interface NavLinkProps {
  label: string;
  href: string;
  selected: boolean;
};

const NavLink = ({ label, href, selected }: NavLinkProps) => {

  return (
    <li className={styles.navLink + (selected ? ' ' + styles.selected : '')}>
      <div className={styles.label}
        style={{ fontSize: `${label.length > 10 ? '1.15rem' : '1.4rem'}` }}
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