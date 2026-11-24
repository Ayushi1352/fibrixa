import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Google_Sans, Inter, Inter_Tight, Lato, Poppins, Red_Hat_Display } from "next/font/google";
import rawData from "@/data/templates.json";
import type { FibrixaTemplateData } from "@/types/templates.types";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

// The design gives each part its own typeface: Red Hat Display (menu, hero, products title), Google Sans (About),
// Poppins (Services title), Inter (Industries, Testimonials, the contact text, footer), Inter Tight (the card titles
// and contact details) and Lato (the "Get In Touch" and "Send Us a Message" titles). The variable fonts carry every
// weight; Poppins and Lato load only the weights the design uses.
const inter = Inter({ subsets: ["latin"], fallback: ["Arial", "sans-serif"], variable: "--font-inter" });
const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], fallback: ["Arial", "sans-serif"], variable: "--font-red-hat-display" });
const googleSans = Google_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], fallback: ["Arial", "sans-serif"], variable: "--font-google-sans" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"], fallback: ["Arial", "sans-serif"], variable: "--font-poppins" });
const interTight = Inter_Tight({ subsets: ["latin"], fallback: ["Arial", "sans-serif"], variable: "--font-inter-tight" });
const lato = Lato({ subsets: ["latin"], weight: ["900"], fallback: ["Arial", "sans-serif"], variable: "--font-lato" });

const templateData: FibrixaTemplateData = rawData;
const sectionData = templateData.categories.Packaging.sections;
const commonData = templateData.common;
const headerData = sectionData.Header?.variants?.PackagingHeader1;

const fontVariables = {
  "--font-primary": commonData.theme.fonts.primary,
  "--font-display": commonData.theme.fonts.display,
  "--font-about": commonData.theme.fonts.about,
  "--font-services": commonData.theme.fonts.services,
  "--font-card": commonData.theme.fonts.card,
  "--font-title": commonData.theme.fonts.title,
} as CSSProperties;

export const metadata: Metadata = {
  title: commonData.metadata.title,
  description: commonData.metadata.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={commonData.metadata.lang}
      style={fontVariables}
      data-scroll-behavior="smooth"
      // Root font size: 16px, and from 1024px up it follows the 1920px design (1rem = 1/120 of the screen, at most 16px),
      // so a 1920px screen shows the design 1:1 and 1440px or 1024px show exactly the same layout, only smaller.
      // Every size on the page is in rem, so it all scales together. Menu links scroll smoothly to their section.
      className={`${inter.variable} ${redHatDisplay.variable} ${googleSans.variable} ${poppins.variable} ${interTight.variable} ${lato.variable} h-full text-[16px] lg:text-[length:min(16px,calc(100vw/120))] scroll-smooth antialiased [&_:where(a[href],button:not(:disabled),select,summary,[role=button])]:cursor-pointer motion-reduce:scroll-auto motion-reduce:[&_*]:!duration-[0.01ms]`}
    >
      <body className="min-h-full bg-[var(--color-bg-backdrop)] font-sans text-[var(--color-text)] selection:bg-[var(--color-maroon)] selection:text-[var(--color-white)]">
        {/*
          The whole site sits in one frame, at most 1920px wide and centred. Up to 1920px it fills the screen, so
          nothing changes; on wider screens or when the browser is zoomed out the page stays in the middle with
          equal space on both sides instead of stretching.
        */}
        <div className="mx-auto flex min-h-screen w-full max-w-[120rem] flex-col overflow-x-clip bg-[var(--color-bg-main)]">
          <Header data={headerData} company={commonData.company} />
          {children}
          <ScrollReveal />
          <Footer data={commonData.Footer} company={commonData.company} />
        </div>
      </body>
    </html>
  );
}
