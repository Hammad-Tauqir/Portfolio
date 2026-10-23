import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "http://localhost:3000"),
  title: {
    default: `${site.name} — Full-Stack Developer & AI Automation Builder`,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  openGraph: {
    title: `${site.name} — Full-Stack Developer & AI Automation Builder`,
    description: site.intro,
    type: "website",
    locale: "en_US",
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full-Stack Developer & AI Automation Builder`,
    description: site.intro,
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f4f1e9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div id="top" />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
