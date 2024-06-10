"use client"

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import Hamburger from "./Hamburger/Hamburger";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ImageData, NavItem } from "@/types/sections";
import { fetchNavList } from "@/scripts/db";
import { fetchImageData } from "../../firebase";

type HeaderProps = {
  logoImages: ImageData[],
  navItems: NavItem[],
  socialImages: ImageData[],
};

const Header = ({ logoImages, navItems, socialImages }: HeaderProps) => {
  // const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (newState: boolean) => setMenuOpen(newState);

  useEffect(() => {
    console.log('adding opacity to body');
    document.body.style.opacity = '1';
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);



  return (
    <header className={(pathname === '/' && !menuOpen) ? 'expanded' : ''} >
      <Link href='/'>
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