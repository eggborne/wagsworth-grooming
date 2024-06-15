import { NavItem } from "@/types/sections";

const nextSectionFromPath = (pathname: string, navItems: NavItem[]): NavItem | null => {
  const nextSectionIndex = navItems.findIndex((item) => item.href === pathname.slice(1));
  const nextSection = (nextSectionIndex + 1) < navItems.length ? navItems[nextSectionIndex + 1] : null;
  return nextSection;
}

function militaryToStandardTime(militaryTime: number): string {
  if (!militaryTime) return '';
  const hours = Math.floor(militaryTime / 100);
  const minutes = militaryTime % 100;
  let amPm = hours >= 12 ? 'pm' : 'am';
  let standardHours = hours % 12;

  // Handle midnight and noon
  if (standardHours === 0) {
    standardHours = 12;
  }

  return `${standardHours}:${minutes.toString().padStart(2, '0')}${amPm}`;
}

export {
  nextSectionFromPath,
  militaryToStandardTime,
};