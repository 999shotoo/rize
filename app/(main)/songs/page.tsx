import { fetchPages } from "@/action/fetch";
import { CustomCards } from "@/components/cards";
import { FeaturedCard } from "@/components/featuredcard";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import CustomImage from "@/components/ui/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cookies } from "next/headers";
import { Link } from "next-view-transitions";

export default async function SongsPage() {
  const cookieStore = cookies();
  const getlang = cookieStore.get("lang");
  const language = getlang?.value || "english";
  const getsongs = await fetchPages(language);
  const songsdata = getsongs.data.trending.songs;
  const featuredSongs = songsdata[0];
  const regularSongs = songsdata.slice(1);
  return (
    <>
      <div className="bg-background min-h-screen">
        <ScrollArea className="h-[calc(100vh-3.5rem)] px-4 py-6 lg:py-8">
          <div className="container">
            <FeaturedCard playlist={featuredSongs} />
            <div className="my-6">
              <CustomCards data={regularSongs} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
