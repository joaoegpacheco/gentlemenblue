import { Abril_Fatface, Bebas_Neue, Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const empera = localFont({
  src: "../assets/fonts/Empera-Regular.otf",
  variable: "--font-family-title",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const emperaVintage = localFont({
  src: "../assets/fonts/Empera-Vintage.otf",
  variable: "--font-family-title-vintage",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const abrilFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-family-abril",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-inter",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const fontVariables = [
  empera.variable,
  emperaVintage.variable,
  bebasNeue.variable,
  abrilFatface.variable,
  inter.variable,
  montserrat.variable,
].join(" ");
