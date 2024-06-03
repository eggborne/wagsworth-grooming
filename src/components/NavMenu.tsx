import Link from "next/link";
import styles from "./NavMenu.module.css";

interface NavMenuProps {
  navItems:
  {
    label: string;
    href: string;
  }[];
};

const NavMenu = ({ navItems }: NavMenuProps) => {

  return (
    <div className={styles.navMenu}>    
      {
        navItems.map(({label, href}) => (
          <nav key={href}>
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