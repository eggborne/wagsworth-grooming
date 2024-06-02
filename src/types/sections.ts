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
  question: string | string[]; // Allow for single or multi-line questions
  answer: Paragraph[];
}

// Union type for all possible section types
type Section =
  | {
    href: "services";
    label: "Services";
    note: Paragraph[];
    pricedServices: PricedService[];
    slides: Slide[];
  }
  | {
    href: "about";
    label: "About Me";
    textContent: Paragraph[];
  }
  | {
    href: "requirements";
    label: "Requirements";
    requirements: Requirement[];
  }
  | {
    href: "faqs";
    label: "FAQs";
    questions: Question[];
  }
  | {
    href: "contact";
    label: "Contact";
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
