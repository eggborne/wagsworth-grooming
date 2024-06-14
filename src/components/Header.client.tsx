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
import classNames from "classnames";
import { nextSectionFromPath } from "@/scripts/util";

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

  useEffect(() => {
    console.log('adding opacity to body');
    document.body.style.opacity = '1';
    const handleScroll = () => {
      if (menuOpen) return;
      const scrollY = Math.ceil(window.scrollY);
      const notAtTop = scrollY > 0;
      setScrolled(notAtTop);      
      if (notAtTop) {
        let pastYPoint = scrollY >= Math.abs(document.body.scrollHeight - window.innerHeight);
        if (navFooterVisible) {
          pastYPoint = scrollY < Math.abs(document.body.scrollHeight - window.innerHeight);
        }
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

  // useEffect(() => {
  //   setExpanded((pathname === '/' && !scrolled) && !menuOpen)
  // }, [pathname, scrolled, menuOpen]);

  const closeNavIfLogoClicked = () => {
    if (menuOpen) {
      toggleMenu(false);
    }
  };

  const headerExpanded = pathname === '/' && !scrolled && !menuOpen;

  const headerClasses = classNames({
    'expanded': headerExpanded,
    'scrolled': scrolled
  });

  // const nextSectionIndex = navItems.findIndex((item) => item.href === pathname.slice(1));
  // const nextSection = (nextSectionIndex + 1) < navItems.length ? navItems[nextSectionIndex + 1] : null;

  const nextSection = nextSectionFromPath(pathname, navItems);

  console.log()

  return (
    <header className={headerClasses} >
      {pathname !== '/admin' ?
        <>
          <Link href='/' onClick={closeNavIfLogoClicked}>
            <Logo logoImages={logoImages} revealed={true} />
          </Link>
          <ContactIcons
            contactInfo={contactInfo}
            expanded={headerExpanded}
            // scrolled={!menuOpen && scrolled && pathname !== '/'}
            scrolled={scrolled}
          />
          <Hamburger onClick={toggleMenu} open={menuOpen} />
          {nextSection && <SectionFooter navInfo={nextSection} showing={navFooterVisible} />}
          <NavMenu
            navItems={navItems}
            socialImages={socialImages}
            open={menuOpen}
            selectedNavItem={pathname}
          />
        </>
        :
        <div>admin header</div>
      }
    </header>
  );
};

export default Header;