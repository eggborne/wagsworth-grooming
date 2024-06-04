import Link from "next/link";
import styles from "./NavMenu.module.css";

interface NavMenuProps {
  navItems:
  {
    label: string;
    href: string;
  }[];
  open: boolean;
  onSelect: () => void;
};

const NavMenu = ({ navItems, open, onSelect }: NavMenuProps) => {

  return (
    <div className={styles.navMenu + (!open ? " " + styles.closed : "")}>    
      {
        navItems.map(({label, href}) => (
          <nav onClick={onSelect} key={href}>
            <Link href={href}>
              {label}
            </Link>
          </nav>
        ))
      }
    </div>
    
  );
};

export default NavMenu;