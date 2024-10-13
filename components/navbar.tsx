"use client";

import { MusicIcon, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { searchAction } from "@/action/fetch";
import { usePathname } from "next/navigation";

const navItems: { href: string; label: string }[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/artists",
    label: "Artists",
  },
  {
    href: "/playlist",
    label: "Playlist",
  },
  {
    href: "/albums",
    label: "Albums",
  },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <header className="flex items-center justify-between border-b p-4 bg-background">
        <div className="flex items-center space-x-4">
          <Link href={`/`}>
            <MusicIcon className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex gap-2">
          <nav className="hidden lg:flex gap-4 text-md my-auto px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={` hover:underline ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-secondary-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form className="flex items-center gap-2" action={searchAction}>
            <Input
              className="w-48 md:w-96 rounded-full"
              placeholder="Search for songs, artists, albums..."
              name="search"
              type="text"
              required
            />
            {/* <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button> */}
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>
    </>
  );
}
