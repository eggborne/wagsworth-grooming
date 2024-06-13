"use client"

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import Hamburger from "./Hamburger/Hamburger";
// import styles from "./Header.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ContactInfo, ImageMetadata, NavItem } from "@/types/sections";
import Image from "next/image";
import ContactIcons from "./ContactIcons/ContactIcons";
import SectionFooter from "./SectionFooter/SectionFooter";

type HeaderProps = {
  navItems: NavItem[],
  contactInfo: ContactInfo,
  logoImages: Record<string, ImageMetadata>,
  socialImages: Record<string, ImageMetadata>,
};

const Header = ({ navItems, contactInfo, logoImages, socialImages }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navFooterVisible, setNavFooterVisible] = useState(false);
  
  const pathname = usePathname();

  const toggleMenu = (newState: boolean) => setMenuOpen(newState);

  useLayoutEffect(() => {
    console.log('adding opacity to body');
    document.body.style.opacity = '1';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = Math.ceil(window.scrollY);
      const notAtTop = scrollY > 0;
      setScrolled(notAtTop);
      if (notAtTop) {
        const pastYPoint = scrollY >= (document.body.scrollHeight - window.innerHeight);
        setNavFooterVisible(pastYPoint);
      }      
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setNavFooterVisible(false);
  }, [pathname]);

  const closeNavIfLogoClicked = () => {
    if (menuOpen) {
      toggleMenu(false);
    }
  };

  const headerExpanded = (((pathname === '/' && !scrolled)) && !menuOpen);
  let headerClass = 'header' 
  // headerClass += ((pathname !== '/') && scrolled && !menuOpen) ? ' scrolled' : '';
  if (headerExpanded) {
    headerClass += ' expanded';
  }

  const nextSectionIndex = navItems.findIndex((item) => item.href === pathname.slice(1));
  // const nextSection = navItems[((nextSectionIndex + 1) === navItems.length) ? 0 : (nextSectionIndex + 1)];
  const nextSection = (nextSectionIndex + 1) < navItems.length ? navItems[nextSectionIndex + 1] : null;
  
  return (
    <header className={headerClass} >
      <Link href='/' onClick={closeNavIfLogoClicked}>
        <Logo logoImages={logoImages} />
      </Link>
      <ContactIcons
        contactInfo={contactInfo}
        expanded={headerExpanded}
        // scrolled={!menuOpen && scrolled && pathname !== '/'}
        scrolled={false}
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