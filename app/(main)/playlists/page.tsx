import { fetchPages } from "@/action/fetch";
import { CustomCards } from "@/components/cards";
import { FeaturedCard } from "@/components/featuredcard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomImage from "@/components/ui/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music2, Play } from "lucide-react";
import { cookies } from "next/headers";
import { Link } from "next-view-transitions";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

export default async function PlaylistsPage() {
  const cookieStore = cookies();
  const getlang = cookieStore.get("lang");
  const language = getlang?.value || "english";
  const getsongs = await fetchPages(language);
  const playlistdata = getsongs.data.playlists;
  const featuredPlaylist = playlistdata[0];
  const regularPlaylists = playlistdata.slice(1);
  return (
    <>
      <div className="bg-background min-h-screen">
        <ScrollArea className="h-[calc(100vh-3.5rem)] px-4 py-6 lg:py-8">
          <div className="container">
            <FeaturedCard playlist={featuredPlaylist} />
            <div className="my-6">
              <CustomCards data={regularPlaylists} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
