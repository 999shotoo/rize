import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Undo2 } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import localFont from "next/font/local";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";

const cloisterBlack = localFont({
  src: "../fonts/CloisterBlackLight-axjg.ttf",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  if (userId) {
    redirect("/");
  }

  return (
    <>
      <div className="relative">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
          <Link href={`/`}>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2 p-4 ">
        <div className="relative hidden lg:block bg-card overflow-hidden rounded-xl h-[96vh]">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.8"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--background))"
                  stopOpacity="0.2"
                />
              </linearGradient>
            </defs>
            <path d="M0,0 C40,20 60,80 100,100 L100,0 Z" fill="url(#grad1)">
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                  M0,0 C40,20 60,80 100,100 L100,0 Z;
                  M0,0 C20,40 80,60 100,100 L100,0 Z;
                  M0,0 C40,20 60,80 100,100 L100,0 Z
                "
              />
            </path>
          </svg>
          <div className={cloisterBlack.className}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h1
                className="text-7xl font-bold mb-4 transform -rotate-6 text-shadow-lg"
                style={{ fontFamily: cloisterBlack.style.fontFamily }}
              >
                LEGENDS
              </h1>
              <h1 className="text-7xl font-bold mb-8 transform rotate-6 text-shadow-lg font-">
                NEVER DIE
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">{children}</div>
      </div>
    </>
  );
}
