"use client";

import Link from "next/link";
import {
  AudioLines,
  Home,
  Library,
  ListMusic,
  Menu,
  Music,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { searchAction } from "@/action/fetch";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useStoreSongs } from "@/hook/useStoreSongs";
import SidebarPlayer from "./player/sidebarplayer";
export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const navItems: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "/",
    label: "Home",
    icon: <Home className="w-4 h-4" />,
  },
  {
    href: "/songs",
    label: "Songs",
    icon: <Music className="w-4 h-4" />,
  },
  {
    href: "/playlists",
    label: "Playlists",
    icon: <ListMusic className="w-4 h-4" />,
  },
  {
    href: "/albums",
    label: "Albums",
    icon: <Library className="w-4 h-4" />,
  },
];
export function NavWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeMusic } = useStoreSongs();
  const pathname = usePathname();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr_320px]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block h-[92vh]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center justify-center gap-2" href="/">
              <AudioLines className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl ">
                Rize<span className="font-light text-foreground/75">PLAY</span>
              </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary
                     ${
                       pathname === item.href
                         ? "bg-muted text-primary"
                         : "text-muted-foreground"
                     }
                    `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div>
            <Link
              className="flex items-center justify-center md:hidden gap-2"
              href="/"
            >
              <AudioLines className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">
                Rize<span className="font-light text-foreground/75">PLAY</span>
              </span>
            </Link>
          </div>
          <div className="w-full flex-1">
            <form action={searchAction}>
              <div className="relative ">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search music..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 rounded-full"
                />
              </div>
            </form>
          </div>
          <UserButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-card">
              <nav className="grid gap-2 text-lg font-medium py-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      pathname === item.href
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <ScrollArea className="h-[90vh]">{children}</ScrollArea>
      </div>

      {/* Right Side Bar */}

      <div className="hidden border-l bg-muted/40 lg:block h-[92vh]">
        <SidebarPlayer />
      </div>
    </div>
  );
}
