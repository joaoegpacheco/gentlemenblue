import { Abril_Fatface, Bebas_Neue, Inter, Montserrat, Poppins } from "next/font/google";

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

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const fontVariables = [
  bebasNeue.variable,
  abrilFatface.variable,
  inter.variable,
  montserrat.variable,
  poppins.variable,
].join(" ");
