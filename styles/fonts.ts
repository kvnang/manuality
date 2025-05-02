import { Edu_SA_Beginner, Geist, Geist_Mono, Lexend } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const eduSaBeginner = Edu_SA_Beginner({
  variable: "--font-edu-sa-beginner",
  subsets: ["latin"],
});

export { geistSans, geistMono, lexend, eduSaBeginner };
