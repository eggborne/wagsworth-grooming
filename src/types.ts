type Paragraph = string;
type ImagePath = string;
type Color = string;
type PhoneNumber = string;

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

interface HeadLineBodySet {
  headline: string;
  bodyText: Paragraph[];
}

interface HomePageData {
  bannerText: string;
  introContent: Paragraph[];
  pageTitle: string;
}

interface ContactInfo {
  addressCoords: {
    n: string,
    w: string,
  };
  email: string;
  hours: {
    Sunday: { open: number, close: number },
    Monday: { open: number, close: number },
    Tuesday: { open: number, close: number },
    Wednesday: { open: number, close: number },
    Thursday: { open: number, close: number },
    Friday: { open: number, close: number },
    Saturday: { open: number, close: number },
  }
  phone: PhoneNumber;
  streetAddress: string[];
}

interface ImageMetadata {
  url: string;
  height: number;
  width: number;
  alt: string;
  href?: string;
};

interface NavItem {
  href: string;
  label: string;
  order: number;
};

interface SectionData {
  href: string;
  label: string;
  note?: Paragraph[];
  order: number;
  bannerImage?: ImageMetadata;
  pageTitle: string;
  textContent?: Paragraph[];
}

interface SiteContentData {
  contactInfo: ContactInfo;
  homePage: HomePageData;
  images: {
    gallery: Record<string, ImageMetadata>;
    logo: Record<string, ImageMetadata>;
    socialLinks: Record<string, ImageMetadata>;
    ui: Record<string, ImageMetadata>;
  };
  metaInfo: SiteMetaInfo,
  sections: {
    [key: string]: SectionData | ServicesData | AboutData | FAQsData | RequirementsData | ContactData;
  };
  style: Record<string, string | number>;
  theme: string;
}

interface UserData {
  email: string;
  sites: {
    lastEdited: number,
    siteID: string,
    siteName: string,
    siteUrl: string,
  }[];
  username: string;
  uid: string;
}

interface ServicesData extends SectionData {
  pricedServices: PricedService[];
  pricedServicesLabel: string;
  slides: Slide[];
}

interface AboutData extends SectionData {
  textContent: Paragraph[];
}

interface FAQsData extends SectionData {
  questions: HeadLineBodySet[];
}

interface RequirementsData extends SectionData {
  requirements: HeadLineBodySet[];
}

interface ContactData extends SectionData { }

interface SiteMetaInfo {
  siteName: string,
  siteUrl: string,
  siteID: string,
  lastEdited: number,
}

export type {
  SiteMetaInfo, ServicesData, AboutData, FAQsData, RequirementsData, ContactData,
  HomePageData, ContactInfo, SectionData, NavItem, ImageMetadata, UserData, SiteContentData
};
