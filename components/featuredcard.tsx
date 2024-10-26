"use client";

import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import CustomImage from "./ui/image";
import { Play } from "lucide-react";
import { useStoreSongs } from "@/hook/useStoreSongs";
import {
  fetchAlbumById,
  fetchPlaylistById,
  fetchSongsById,
} from "@/action/fetch";

export function FeaturedCard({ playlist }: any) {
  const { setActiveMusic, setSongs } = useStoreSongs();

  const PlaySelected = async (data: any) => {
    if (data.type === "album") {
      const albumdata = await fetchAlbumById(data.id);
      setSongs(albumdata.data.songs);
      setActiveMusic(albumdata.data.songs[0]);
    } else if (data.type === "song") {
      const getsongs = await fetchSongsById(data.id);
      const combinedData = {
        songs: [...getsongs.data.song.data, ...getsongs.data.suggestions.data],
      };
      setSongs(combinedData.songs);
      setActiveMusic(getsongs.data.song.data[0]);
    } else if (data.type === "playlist") {
      const playlistdata = await fetchPlaylistById(data.id);
      setSongs(playlistdata.data.songs);
      setActiveMusic(playlistdata.data.songs[0]);
    }
  };

  return (
    <Card className="w-full overflow-hidden mb-6">
      <CardContent className="p-0">
        <div className="relative aspect-[21/9] md:aspect-[21/7]">
          <CustomImage
            src={
              playlist.image && typeof playlist.image === "string"
                ? playlist.image
                : (playlist.image.find(
                    (image: any) => image.quality === "500x500"
                  ) ||
                    playlist.image[0] ||
                    {})[
                    typeof playlist.image.find(
                      (image: any) => image.quality === "500x500"
                    ) === "object" &&
                    playlist.image.find(
                      (image: any) => image.quality === "500x500"
                    ).link
                      ? "link"
                      : "url"
                  ]
            }
            alt={`${playlist.name} cover`}
            className="object-cover w-full h-[50vh]"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2 md:p-6">
            <p className="text-white text-sm font-medium mb-1">
              FEATURED PLAYLIST
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
              {playlist.name || playlist.title}
            </h2>
            <div className="flex space-x-4">
              <Link href={`/${playlist.type}/${playlist.id}`} passHref>
                <Button size="lg" className="text-lg">
                  View Playlist
                </Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg"
                onClick={() => PlaySelected(playlist)}
              >
                <Play className="mr-2 h-5 w-5" /> Play
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
