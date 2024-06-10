"use client"

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import Hamburger from "./Hamburger/Hamburger";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ImageData, ImageMetadata, NavItem } from "@/types/sections";

type HeaderProps = {
  navItems: NavItem[],
  logoImages: Record<string, ImageMetadata>,
  socialImages: Record<string, ImageMetadata>,
};

const Header = ({ navItems, logoImages, socialImages }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();

  const toggleMenu = (newState: boolean) => setMenuOpen(newState);

  useEffect(() => {
    console.log('adding opacity to body');
    document.body.style.opacity = '1';

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeNavIfLogoClicked = () => {
    if (menuOpen) {
      toggleMenu(false);
    }
  };

  let headerClass = (scrolled && !menuOpen) ? 'scrolled' : '';
  if ((pathname === '/' && !menuOpen)) {
    headerClass += ' expanded';
  }


  return (
    <header className={headerClass} >
      <Link href='/' onClick={closeNavIfLogoClicked}>
        <Logo logoImages={logoImages} />
      </Link>
      <Hamburger onClick={toggleMenu} open={menuOpen} />
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