import Link from "next/link";
import styles from "./NavMenu.module.css";
import NavLink from "../NavLink/NavLink";

interface NavMenuProps {
  navItems:
  {
    label: string;
    href: string;
  }[];
  socialItems: string[];
  open: boolean;
  selectedNavItem: string;
  onSelect: (href: string) => void;
};

const NavMenu = ({ navItems, socialItems, open, selectedNavItem, onSelect }: NavMenuProps) => {

  return (
    <nav className={styles.navMenu + (!open ? " " + styles.closed : "")}>
      <ul>
        {navItems.map(({ label, href }) => (
          <Link key={href} onClick={() => onSelect(href)} href={href}>
            <NavLink
              label={label}
              href={href}
              selected={selectedNavItem === '/' + href}
            />
          </Link>
        ))}
      </ul>
      <div className={styles.socialLabel}>Follow us</div>
      <div className={styles.socialLinks}>
        {socialItems.map((item, i) => (
          <a key={i} href={'#'}>
            <img src={item} alt='' />
          </a>
        ))}
      </div>
      <footer className={styles.navFooter}>{`© ${new Date().getFullYear()} Wagsworth Grooming`} | website by <a href='https://github.com/eggborne'>mikedonovan.dev</a></footer>
    </nav>

  );
};

export default NavMenu;