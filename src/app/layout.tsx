import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header.client";
import { fetchContactInfo, fetchImageMetadata, fetchNavList } from "@/scripts/db";

export const metadata: Metadata = {
  title: "Wagsworth Grooming | Professional Dog Grooming in Tualatin, Oregon",
  description: "Professional Dog Grooming in Tualatin, Oregon",
};

const businessData = {
  "@context": "http://www.schema.org",
  "@type": "ProfessionalService",
  "name": "Wagsworth Grooming",
  "url": "https://wagsworthgrooming.com",
  "telephone": "+19712245154",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "19300 SW Boones Ferry Rd Suite 7",
    "addressLocality": "Oregon",
    "addressRegion": "OR",
    "postalCode": "97062",
    "addressCountry": "US"
  },
  "logo": "https://wagsworthgrooming.com/wagsworthbanner.jpg",
  "description": "Professional dog grooming in Tualatin, Oregon.",
  "openingHours": "Su, Mo 09:00-17:00, Tu 09:00-17:00 We 09:00-17:00 We 09:00-17:00 Th 09:00-17:00 Fr 09:00-17:00 Sa",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "9712245154",
    "contactType": "phone"
  }
};

export const viewport = {
  themeColor: "var(--off-black)",
}

export const revalidate = 600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log('Layout rendering!!!!');

  const [navItems, contactInfo, socialImages, logoImages] = await Promise.all([
    fetchNavList(),
    fetchContactInfo(),
    fetchImageMetadata('socialLinks'),
    fetchImageMetadata('logo'),
  ]);
  
  return (
    <html lang="en">
      <body>
        <Header
          navItems={navItems}
          contactInfo={contactInfo}
          logoImages={logoImages}
          socialImages={socialImages}
        />
        {children}        
      </body>
    </html>
  );
}