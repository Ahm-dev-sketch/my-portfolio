import type { Metadata, Viewport } from "next";
import { Cormorant, Nunito } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { translations } from "@/data/translations";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const meta = translations.en.meta;

export const metadata: Metadata = {
  metadataBase: new URL("https://mutiahulfa.vercel.app"),
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
  themeColor: "#FEF4EA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${nunito.variable}`}>
      <body className="min-h-dvh flex flex-col bg-[#FEF4EA] font-sans text-[#421623] antialiased selection:bg-[#F3C7BE] selection:text-[#5C1227]">
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
