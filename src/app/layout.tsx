import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FavoritesProvider } from "@/context/FavouritesContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "antd/dist/reset.css"; // for Ant Design v5+
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blooming Buddy - Your Plant Care Companion",
  description: "Discover plants, learn care tips, and maintain your favorite plant collection with Blooming Buddy.",
  keywords: "plants, gardening, plant care, flowers, herbs, indoor plants",
  authors: [{ name: "Blooming Buddy Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FavoritesProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
