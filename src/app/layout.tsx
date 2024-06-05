import type { Metadata } from "next";
import "./globals.css";
import { fetchNavData, fetchUrlsFromStorage } from "@/scripts/db";
import Header from "@/components/Header.client";

export const metadata: Metadata = {
  title: "Wagsworth Grooming | Professional Dog Grooming in Tualatin, Oregon",
  description: "Professional Dog Grooming in Tualatin, Oregon",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const logoUrls = await fetchUrlsFromStorage('logo');
  const uiUrls = await fetchUrlsFromStorage('ui');
  const socialItems = await fetchUrlsFromStorage('icons/social');
  const backgroundImageUrl = uiUrls.find((url) => url.includes('background'));
  const navItems = await fetchNavData();

  return (
    <html lang="en">
      <body style={{
        backgroundImage: `url(${backgroundImageUrl}`,
        opacity: '0',
      }}>
        <Header logoUrls={logoUrls} navItems={navItems} socialItems={socialItems} />
        {children}
        <footer>{`© ${new Date().getFullYear()} Wagsworth Grooming`} | website by <a href='https://github.com/eggborne'>mikedonovan.dev</a></footer>
      </body>
    </html>
  );
}