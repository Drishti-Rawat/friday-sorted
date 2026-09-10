import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces, Caveat } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serifFont = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const handwritingFont = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friday, Sorted. — Fun Friday Ideas",
  description:
    "Find fun ideas to make your Friday special. Tell us your mood, your energy, and who you're with.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${handwritingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-dark font-sans selection:bg-primary/20 selection:text-dark">
        {children}
      </body>
    </html>
  );
}
