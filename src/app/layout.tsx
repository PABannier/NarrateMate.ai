import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import ClientLayout from "@/components/layout-client";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "NarrateMate.ai",
  description: "Enhance your language comprehension with NarrateMate.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable}`}
      data-theme="emerald"
    >
      <body>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <ClientLayout>{children}</ClientLayout>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
