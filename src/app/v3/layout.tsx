import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/theme-v3.css";
import { content } from "@/lib/content/de";
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${content.meta.title} · v3`,
  description: content.meta.description,
  openGraph: {
    title: `${content.meta.title} · v3`,
    description: content.meta.description,
    url: `${content.meta.siteUrl}/v3`,
    siteName: "VN Modulhaus",
    locale: "de_DE",
    type: "website",
  },
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} min-h-full`}
      style={{ background: "#012C4E", minHeight: "100%" }}
    >
      {children}
    </div>
  );
}
