import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { translations } from "@/data/translations";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const meta = translations.en.meta;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  applicationName: "Mutiah Ulfa Sitompul — Portfolio",
  openGraph: {
    type: "website",
    siteName: "Mutiah Ulfa Sitompul",
    title: meta.ogTitle,
    description: meta.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F8F5",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col bg-canvas font-sans text-ink antialiased">
        <LanguageProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
