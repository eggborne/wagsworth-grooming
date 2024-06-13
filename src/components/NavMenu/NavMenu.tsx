import Link from "next/link";
import styles from "./NavMenu.module.css";
import NavLink from "../NavLink/NavLink";
import { ImageMetadata, NavItem } from "@/types/sections";
import Image from "next/image";
import SocialLinks from "../SocialLinks/SocialLinks";

interface NavMenuProps {
  navItems: NavItem[];
  socialImages: Record<string, ImageMetadata>;
  open: boolean;
  selectedNavItem: string;
};

const NavMenu = ({ navItems, socialImages, open, selectedNavItem }: NavMenuProps) => {  
  
  return (
    <nav className={styles.navMenu + (!open ? " " + styles.closed : "")}>
      <ul>
        {navItems.map(({ label, href }) => (
          <Link prefetch key={href} href={href}>
            <NavLink
              label={label}
              href={href}
              selected={selectedNavItem === '/' + href}
            />
          </Link>
        ))}
      </ul>
      <SocialLinks socialImages={socialImages} />
      {/* <footer className={styles.navFooter}>{`© ${new Date().getFullYear()} Wagsworth Grooming`} | website by <a href='https://github.com/eggborne'>mikedonovan.dev</a></footer> */}
    </nav>

  );
};

export default NavMenu;