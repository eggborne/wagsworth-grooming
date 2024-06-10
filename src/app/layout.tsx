import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header.client";
import { fetchImageMetadata, fetchNavList } from "@/scripts/db";

export const metadata: Metadata = {
  title: "Wagsworth Grooming | Professional Dog Grooming in Tualatin, Oregon",
  description: "Professional Dog Grooming in Tualatin, Oregon",
};

export const viewport = {
  themeColor: "var(--off-black)",
}

// export const revalidate = false

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log('Layout rendering!!!!');

  // const navItems = await fetchNavList();
  // const socialImages = await fetchImageMetadata('socialLinks');
  // const logoImages = await fetchImageMetadata('logo');

  const [ navItems, socialImages, logoImages ] = await Promise.all([
    fetchNavList(),
    fetchImageMetadata('socialLinks'),
    fetchImageMetadata('logo'),
  ]);
  return (
    <html lang="en">
      <body style={{
        backgroundImage: `url(seamlesstile.jpg)`,
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