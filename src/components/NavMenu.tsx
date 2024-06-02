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
        navItems.map(({label, href}, i) => (
          <nav key={i}>
            <h2>{label}</h2>
          </nav>
        ))
      }
    </div>
    
  );
};

export default NavMenu;