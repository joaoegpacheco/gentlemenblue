import { Bebas_Neue, Black_Han_Sans, Inter, Montserrat, Oswald } from "next/font/google";
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

export const blackHanSans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-han-sans",
});

export const abrilFatface = localFont({
  src: "../../public/fonts/AbrilFatface-Regular.ttf",
  variable: "--font-family-abril",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-inter",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const oswald = Oswald({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const fontVariables = [
  empera.variable,
  emperaVintage.variable,
  bebasNeue.variable,
  blackHanSans.variable,
  abrilFatface.variable,
  inter.variable,
  montserrat.variable,
  oswald.variable,
].join(" ");
