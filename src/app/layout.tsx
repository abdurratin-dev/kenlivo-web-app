import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";
import Footer from "@/components/layout/footer";

// Fills `--font-playfair`, which `font-heading` (see globals.css) resolves to.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kenlivo",
  description:
    "Kenlivo - Beauty Meets Lifestyle",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="bg-[#FFF9F2]">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
