"use client"

import Link from "next/link";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import Hamburger from "./Hamburger";
import { useState } from "react";

type LogoProps = {
  logoUrls: string[],
  navItems:
  {
    label: string;
    href: string;
  }[],
};

const Header = ({ logoUrls, navItems }: LogoProps) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (newState: boolean) => setMenuOpen(newState);

  return (
    <header>
      <Link href='/'>
        <Logo logoUrls={logoUrls} />
      </Link>
      <Hamburger onClick={toggleMenu} open={menuOpen} />
      <NavMenu onSelect={() => toggleMenu(false)} navItems={navItems} open={menuOpen} />
    </header>
  );
};

export default Header;