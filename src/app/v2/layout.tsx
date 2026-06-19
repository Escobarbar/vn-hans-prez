import { Montserrat, Open_Sans } from "next/font/google";
import "@/styles/theme-v2.css";
import { content } from "@/lib/content/de";
import type { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${content.meta.title} · v2`,
  description: content.meta.description,
  openGraph: {
    title: `${content.meta.title} · v2`,
    description: content.meta.description,
    url: `${content.meta.siteUrl}/v2`,
    siteName: "VN Modulhaus",
    locale: "de_DE",
    type: "website",
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${montserrat.variable} ${openSans.variable} min-h-full`}
      style={{ background: "#2E2D20", minHeight: "100%" }}
    >
      {children}
    </div>
  );
}
