import styles from "./NavLink.module.css";

interface NavLinkProps {
  label: string;
  href: string;
  selected: boolean;
};

const NavLink = ({ label, selected }: NavLinkProps) => {
  const labelFontSize = `${label.length > 10 ?
    'calc(var(--bone-height) / 2.75)'
    :
    'calc(var(--bone-height) / 2.5)'}`
  ;
  return (
    <li className={styles.navLink + (selected ? ' ' + styles.selected : '')}>
      <div className={styles.label}
        style={{
          fontSize: labelFontSize
        }}
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