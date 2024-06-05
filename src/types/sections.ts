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

// Type for the overall data structure
interface WagsworthData {
  sections: Section[];
  style: Record<string, unknown>; // Placeholder for potential style data
}

export type { WagsworthData, Section };
