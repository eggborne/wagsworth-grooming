import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header.client";
import { getAllSiteData } from "../../firebase";

export const metadata: Metadata = {
  title: "Wagsworth Grooming | Professional Dog Grooming in Tualatin, Oregon",
  description: "Professional Dog Grooming in Tualatin, Oregon",
  themeColor: "green",

};

// export const revalidate = false

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const siteData = await getAllSiteData();

  const backgroundImageUrl = siteData.uiUrls.find((url) => url.includes('background'));

  console.log('Layout rendering!!!!')

  return (
    <html lang="en">
      <body style={{
        backgroundImage: `url(${backgroundImageUrl}`,
      }}>
        <Header
          logoUrls={siteData.logoUrls}
          navItems={siteData.navItems}
          socialItems={siteData.socialItems}
        />
        {children}
        <footer>{`© ${new Date().getFullYear()} Wagsworth Grooming`} | website by <a href='https://github.com/eggborne'>mikedonovan.dev</a></footer>
      </body>
    </html>
  );
}