// src/types/sections.ts

// Basic building block types
type Paragraph = string;
type ImagePath = string;
type Color = string;
type PhoneNumber = string;

// Specific types for different sections
interface PricedService {
  name: string;
  price: number;
}

interface Slide {
  headline: string;
  textContent: Paragraph[];
  icon: ImagePath;
  backgroundColor: Color;
}

interface Requirement {
  headline: string;
  bodyText: Paragraph[];
}

interface Question {
  question: string;
  answer: Paragraph[];
}

// Union type for all possible section types
type Section =
  | {
    href: string;
    label: string;
    note: Paragraph[];
    pricedServices: PricedService[];
    slides: Slide[];
  }
  | {
    href: string;
    label: string;
    textContent: Paragraph[];
  }
  | {
    href: string;
    label: string;
    requirements: Requirement[];
  }
  | {
    href: string;
    label: string;
    questions: Question[];
  }
  | {
    href: string;
    label: string;
    phone: PhoneNumber;
    email: string;
    address: string[];
  };

type NavItem = {
  label: string,
  href: string,
};

type ImageData = {
  path: string,
  fileName?: string,
  url: string,
};

type ImageMetadata = {
  url: string,
  height: number,
  width: number,
  alt: string,
  href?: string,
};

type FirebaseData = {
  imageUrls: {
    path: string,
    fileName?: string,
    url: string,
  }[],
  sections: Section[] | Section,
  navItems: NavItem[],
}

type FirebaseInitialData = {
  uiImages: ImageData[],
  logoImages: ImageData[],
  socialImages: ImageData[],
}

// Type for the overall data structure
interface WagsworthData {
  sections: Section[];
  style: Record<string, unknown>; // Placeholder for potential style data
}

export type { WagsworthData, Section, NavItem, FirebaseInitialData, ImageData, ImageMetadata, FirebaseData };
