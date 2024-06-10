import Link from "next/link";
import styles from "./NavMenu.module.css";
import NavLink from "../NavLink/NavLink";
import { ImageData, NavItem } from "@/types/sections";
import Image from "next/image";

interface NavMenuProps {
  navItems: NavItem[];
  socialImages: ImageData[];
  open: boolean;
  selectedNavItem: string;
};

const NavMenu = ({ navItems, socialImages, open, selectedNavItem }: NavMenuProps) => {  
  
  return (
    <nav className={styles.navMenu + (!open ? " " + styles.closed : "")}>
      <ul>
        {navItems.map(({ label, href }) => (
          <Link key={href} href={href}>
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
        {socialImages.map((item, i) => (
          <a key={i} href={'#'}>
            <Image fill src={item.url} alt='' />
          </a>
        ))}
      </div>
      <footer className={styles.navFooter}>{`© ${new Date().getFullYear()} Wagsworth Grooming`} | website by <a href='https://github.com/eggborne'>mikedonovan.dev</a></footer>
    </nav>

  );
};

export default NavMenu;