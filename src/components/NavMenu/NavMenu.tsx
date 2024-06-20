import Link from "next/link";
import styles from "./NavMenu.module.css";
import NavLink from "../NavLink/NavLink";
import { ImageMetadata, NavItem } from "@/types";
import SocialLinks from "../SocialLinks/SocialLinks";
import classNames from "classnames";
import Footer from "../Footer";

interface NavMenuProps {
  navItems: NavItem[];
  socialImages: Record<string, ImageMetadata>;
  open: boolean;
  selectedNavItem: string;
};

const NavMenu = ({ navItems, socialImages, open, selectedNavItem }: NavMenuProps) => {
  const navMenuClasses = classNames([
    styles.navMenu,
    { [styles.closed]: !open }
  ]);
  return (
    <nav className={navMenuClasses}>
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
      <Footer />
    </nav>
  );
};

export default NavMenu;