import { NavItem } from "../types";

const nextSectionFromPath = (pathname: string, navItems: NavItem[]): NavItem | null => {
  const nextSectionIndex = navItems.findIndex((item) => item.href === pathname.slice(1));
  const nextSection = (nextSectionIndex + 1) < navItems.length ? navItems[nextSectionIndex + 1] : null;
  return nextSection;
};

const militaryToStandardTime = (militaryTime: number): string => !militaryTime ? '' : `${(militaryTime / 100 | 0) % 12 || 12}:${`${`${militaryTime % 100}`.padStart(2, '0')}`}${(militaryTime / 100 | 0) >= 12 ? 'pm' : 'am'}`;

export {
  nextSectionFromPath,
  militaryToStandardTime,
};