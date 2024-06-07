"use client"

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import Hamburger from "./Hamburger/Hamburger";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ImageData, NavItem } from "@/types/sections";

type HeaderProps = {
  logoImages: ImageData[],
  navItems: NavItem[],
  socialImages: ImageData[],
};

const Header = ({ logoImages, navItems, socialImages }: HeaderProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState(pathname);
  const [largeLogo, setLargeLogo] = useState(pathname === '/');

  const toggleMenu = (newState: boolean) => setMenuOpen(newState);
  
  const onSelectNavItem = (href: string) => {
    setSelectedNavItem(href);
    setLargeLogo(href === '/');
    setMenuOpen(false);
  };

  useEffect(() => {
    onSelectNavItem(pathname);
  }, [pathname]);

  useEffect(() => {
    console.log('adding BG');
    document.body.style.opacity = '1';
  }, []);


  return (
    <header className={(largeLogo && !menuOpen) ? 'expanded' : ''} >
      <Link onClick={() => onSelectNavItem('/')} href='/'>
        <Logo logoImages={logoImages}/>
      </Link>
      <Hamburger onClick={toggleMenu} open={menuOpen} />
      <NavMenu
        navItems={navItems}
        socialImages={socialImages}
        onSelect={onSelectNavItem}
        open={menuOpen}
        selectedNavItem={selectedNavItem}
      />
    </header>
  );
};

export default Header;