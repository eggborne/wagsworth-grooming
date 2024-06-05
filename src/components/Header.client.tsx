"use client"

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import Hamburger from "./Hamburger/Hamburger";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type HeaderProps = {
  logoUrls: string[],
  navItems:
  {
    label: string;
    href: string;
  }[],
  socialItems: string[],
};

const Header = ({ logoUrls, navItems, socialItems }: HeaderProps) => {
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
  }, [pathname])

  return (
    <header className={(largeLogo && !menuOpen) ? 'expanded' : ''} >
      <Link onClick={() => onSelectNavItem('/')} href='/'>
        <Logo logoUrls={logoUrls} />
      </Link>
      <Hamburger onClick={toggleMenu} open={menuOpen} />
      <NavMenu onSelect={onSelectNavItem} navItems={navItems} socialItems={socialItems} open={menuOpen} selectedNavItem={selectedNavItem} />
    </header>
  );
};

export default Header;