import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kenlivo",
  description: "Kenlivo - Beauty Meets Lifestyle",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
