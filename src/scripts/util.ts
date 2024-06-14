import { NavItem } from "@/types/sections";

const nextSectionFromPath = (pathname: string, navItems: NavItem[]): NavItem | null => {
  const nextSectionIndex = navItems.findIndex((item) => item.href === pathname.slice(1));
  const nextSection = (nextSectionIndex + 1) < navItems.length ? navItems[nextSectionIndex + 1] : null;
  return nextSection;
}

export {
  nextSectionFromPath,
};