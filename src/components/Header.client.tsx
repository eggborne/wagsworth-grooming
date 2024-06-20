"use client"

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import Hamburger from "./Hamburger/Hamburger";
// import styles from "./Header.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ContactInfo, ImageMetadata, NavItem } from "../types";
import ContactIcons from "./ContactIcons/ContactIcons";
import SectionFooter from "./SectionFooter/SectionFooter";
import classNames from "classnames";
import { nextSectionFromPath } from "@/scripts/util";

type HeaderProps = {
  navItems: NavItem[],
  contactInfo: ContactInfo,
  logoImages: Record<string, ImageMetadata>,
  socialImages: Record<string, ImageMetadata>,
};

const Header = ({ navItems, contactInfo, logoImages, socialImages }: HeaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navFooterVisible, setNavFooterVisible] = useState(false);

  const pathname = usePathname();

  const toggleMenu = (newState: boolean) => setMenuOpen(newState);

  const menuOpenRef = useRef(menuOpen);
  const navFooterVisibleRef = useRef(navFooterVisible);

  useLayoutEffect(() => {
    setLoaded(true);
    document.body.style.opacity = '1';
    console.log('added opacity to body');

    const handleScroll = () => {
      if (menuOpenRef.current) return;
      const scrollY = Math.ceil(window.scrollY);
      const notAtTop = scrollY > 0;
      setScrolled(notAtTop);
      let pastYPoint = scrollY >= Math.abs(document.body.scrollHeight - window.innerHeight);
      if (navFooterVisibleRef.current) {
        pastYPoint = scrollY < Math.abs(document.body.scrollHeight - window.innerHeight);
      }
      setNavFooterVisible(pastYPoint);      
    };
    window.addEventListener('scroll', handleScroll);

    const setActualHeight = () => {
      document.documentElement.style.setProperty('--actual-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', setActualHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setActualHeight);
      console.log('removed event listeners on Header unmount')
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setNavFooterVisible(window.innerHeight === document.body.scrollHeight);
  }, [pathname]);

  const closeNavIfLogoClicked = () => {
    if (menuOpen) {
      toggleMenu(false);
    }
  };

  const headerExpanded = pathname === '/' && !scrolled && !menuOpen;

  const headerClasses = classNames({
    'expanded': headerExpanded,
    'scrolled': scrolled,
  });

  const nextSection = nextSectionFromPath(pathname, navItems);

  return (
    <header className={headerClasses} >
      <Link href='/' onClick={closeNavIfLogoClicked}>
        <Logo logoImages={logoImages} revealed={loaded} />
      </Link>
      <ContactIcons
        contactInfo={contactInfo}
        expanded={headerExpanded}
        scrolled={scrolled}
        embedded={false}
      />
      <Hamburger onClick={toggleMenu} open={menuOpen} />
      {nextSection && <SectionFooter navInfo={nextSection} showing={navFooterVisible} />}
      <NavMenu
        navItems={navItems}
        socialImages={socialImages}
        open={menuOpen}
        selectedNavItem={pathname}
      />
    </header>
  );
};

export default Header;