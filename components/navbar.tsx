import { Music, MusicIcon, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const searchAction = async (data: FormData) => {
    "use server";
    return redirect("/search?q=" + data.get("search"));
  };

  return (
    <>
      <header className="flex items-center justify-between border-b p-4 bg-background">
        <div className="flex items-center space-x-4">
          <Link href={`/`}>
            <MusicIcon className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex gap-2">
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
