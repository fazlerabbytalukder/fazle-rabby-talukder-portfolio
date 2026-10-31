import type { Metadata } from "next";
import { Bebas_Neue, Instrument_Serif, Inter } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { site } from "@/data/site";
import "./globals.css";

// Display: tall condensed headlines and numbers
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
// Accent: elegant italic serif words inside headings
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
// Body + UI
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.description,
};

// Applied before paint so a saved light theme doesn't flash dark first
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${instrument.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions often inject attributes into <body> */}
      <body className="bg-ink font-sans text-white antialiased" suppressHydrationWarning>
        <SmoothScroll />
        <ScrollProgress />
        <div aria-hidden className="bg-grid pointer-events-none fixed inset-0 z-0" />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
