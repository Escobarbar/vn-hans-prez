import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/theme-v4.css";
import { content } from "@/lib/content/de";
import type { Metadata } from "next";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${content.meta.title} · v4`,
  description: content.meta.description,
  openGraph: {
    title: `${content.meta.title} · v4`,
    description: content.meta.description,
    url: `${content.meta.siteUrl}/v4`,
    siteName: "VN Modulhaus",
    locale: "de_DE",
    type: "website",
  },
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${jakarta.variable} min-h-full`}
      style={{ background: "#000F18", minHeight: "100%" }}
    >
      {children}
    </div>
  );
}
