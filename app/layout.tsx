import type { Metadata, Viewport } from "next";
import { Quicksand, Caveat } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FemBloom — Tu compañera de bienestar menstrual",
  description:
    "Plataforma de bienestar menstrual, fertilidad y planificación familiar. Una agenda personal para acompañarte en cada fase de tu ciclo.",
  keywords: [
    "ciclo menstrual",
    "fertilidad",
    "planificación familiar",
    "bienestar femenino",
    "salud menstrual",
  ],
  authors: [{ name: "Daniela Giraldo" }],
};

export const viewport: Viewport = {
  themeColor: "#F8C9D3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${quicksand.variable} ${caveat.variable}`}>
      <body className="bg-crema text-cacao font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
