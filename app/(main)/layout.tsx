import { NavWrapper } from "@/components/navwrapper";
import NotAuthHome from "@/components/pages/notauthhome";
import FloatingPlayer from "@/components/player/floatingplayer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@clerk/nextjs/server";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (!userId) {
    return (
      <>
        <NotAuthHome />
      </>
    );
  }
  return (
    <>
      <FloatingPlayer />
      <NavWrapper>{children}</NavWrapper>
    </>
  );
}
