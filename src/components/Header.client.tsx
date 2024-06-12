"use client"

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import Hamburger from "./Hamburger/Hamburger";
// import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ContactInfo, ImageMetadata, NavItem } from "@/types/sections";
import Image from "next/image";

type HeaderProps = {
  navItems: NavItem[],
  contactInfo: ContactInfo,
  logoImages: Record<string, ImageMetadata>,
  socialImages: Record<string, ImageMetadata>,
};

const Header = ({ navItems, contactInfo, logoImages, socialImages }: HeaderProps) => {
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

  // let headerClass = styles.Header;
  let headerClass = ((pathname !== '/') && scrolled && !menuOpen) ? ' scrolled' : '';
  if ((((pathname === '/' && !scrolled) || pathname === '/contact') && !menuOpen)) {
    headerClass += ' expanded';
  }

  return (
    <header className={headerClass} >
      <Link href='/' onClick={closeNavIfLogoClicked}>
        <Logo logoImages={logoImages} />
      </Link>
      <div className='icon-area'>
        <Link href={`tel:+1-${contactInfo.phone}`}>
          <Image
            src={'phoneicon.svg'}
            alt={'phone icon'}
            width={32}
            height={32}
            className={'icon'}
          />
          <div className={'contact-detail phone'}>{`(${contactInfo.phone.slice(0, 3)})-${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6, 10)}`}</div>
        </Link>
        <Link href='mailto:john.c.breckinridge@altostrat.com'>
          <Image
            src={'emailicon.svg'}
            alt={'phone icon'}
            width={32}
            height={32}
            className={'icon'}
          />
          <div className={'contact-detail email'}>booking<br />@wagsworthgrooming.com</div>
        </Link>
      </div>
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