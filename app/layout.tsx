import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ViewTransitions } from "next-view-transitions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Listen Music Free Online - RizePlay",
  description:
    "RizePlay is a free music streaming website where you can stream your favorite musics online for free.",
  manifest: "/manifest.json",
  keywords: ["Music", "Songs", "Free", "No ads", "Watch", "Online", "RizePlay"],
  openGraph: {
    title: "Listen Music Free Online - RizePlay",
    description:
      "RizePlay is a free music streaming website where you can stream your favorite musics online for free.",
    type: "website",
    url: "https://rizeplay.vercel.app",
    images:
      "https://res.cloudinary.com/dyvrrgtvq/image/upload/v1730070119/Summer_Night_Serenade__Anime_Rooftop_Vibes_xsftiv.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <ClerkProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ViewTransitions>
  );
}
