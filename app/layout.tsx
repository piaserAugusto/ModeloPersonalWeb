import type { Metadata } from "next";
import localFont from "next/font/local";
import { brand, site } from "@/lib/content";
import "./globals.css";

/*
 * Poppins self-hosteada (woff2 en app/fonts/).
 * Antes venia de next/font/google, que descarga la fuente en cada build:
 * si fonts.gstatic.com no responde, el build falla con
 * "Module not found: @vercel/turbopack-next/internal/font/google/font".
 * Con next/font/local el build no toca la red.
 */
const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "./fonts/Poppins-400-latin.woff2", weight: "400" },
    { path: "./fonts/Poppins-400-latin-ext.woff2", weight: "400" },
    { path: "./fonts/Poppins-500-latin.woff2", weight: "500" },
    { path: "./fonts/Poppins-500-latin-ext.woff2", weight: "500" },
    { path: "./fonts/Poppins-600-latin.woff2", weight: "600" },
    { path: "./fonts/Poppins-600-latin-ext.woff2", weight: "600" },
    { path: "./fonts/Poppins-700-latin.woff2", weight: "700" },
    { path: "./fonts/Poppins-700-latin-ext.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${brand.fullName}`,
  },
  description: site.description,
  applicationName: `${brand.fullName} - Abogado`,
  authors: [{ name: brand.fullName }],
  creator: brand.fullName,
  keywords: [
    "abogado",
    "estudio juridico",
    "asesoria legal",
    "derecho civil",
    "derecho de familia",
    "derecho laboral",
    "derecho penal",
    "sucesiones",
    "derecho comercial",
    `${site.title}`,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: `${brand.fullName} - Abogado`,
    title: site.title,
    description: site.description,
    // TODO: agregar imagen de preview (1200x630) en /public, ej. /og.jpg
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#101010",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}