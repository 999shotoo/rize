import { Navbar } from "@/components/navbar";
import { NavWrapper } from "@/components/navwrapper";
import FloatingPlayer from "@/components/player/floatingplayer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FloatingPlayer />
      {/* <div className="sticky top-0 w-full z-40">
        <Navbar />
      </div> */}

      <NavWrapper>{children}</NavWrapper>
    </>
  );
}
