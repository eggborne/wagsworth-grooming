import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";
import { fetchNavData, fetchUrlsFromStorage } from "@/scripts/db";
import NavMenu from "@/components/NavMenu";

const inter = Inter({ subsets: ["latin"] });

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
  const backgroundImageUrl = await fetchUrlsFromStorage('/');
  const navItems = await fetchNavData();

  return (
    <html lang="en">
      <body style={{ backgroundImage: `url(${backgroundImageUrl}`}} className={inter.className}>
        <header>
          <Logo logoUrls={logoUrls} />
        </header>
        <NavMenu navItems={navItems} />
        {children}
      </body>
    </html>
  );
}