import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header.client";
import { getInitialSiteData } from "../../firebase";

export const metadata: Metadata = {
  title: "Wagsworth Grooming | Professional Dog Grooming in Tualatin, Oregon",
  description: "Professional Dog Grooming in Tualatin, Oregon",
};

export const viewport = {
  themeColor: "green",
}

// export const revalidate = false

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Layout rendering!!!!');
  const initialSiteData = await getInitialSiteData();
  const navItems = initialSiteData.navItems;
  const socialImages = initialSiteData.socialImages;
  const logoImages = initialSiteData.logoImages;

  const backgroundImageUrl = initialSiteData.uiImages.filter(urlSet => urlSet.fileName?.includes('background'))[0].url;

  return (
    <html lang="en">
      <body style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}>
        <Header
          logoImages={logoImages}
          navItems={navItems}
          socialImages={socialImages}
        />
        {children}
        <footer>{`© ${new Date().getFullYear()} Wagsworth Grooming`} | website by <a href='https://github.com/eggborne'>mikedonovan.dev</a></footer>
      </body>
    </html>
  );
}