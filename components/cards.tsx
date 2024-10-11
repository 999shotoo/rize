"use client";

import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlayIcon } from "lucide-react";
import { useStoreSongs } from "@/hook/useStoreSongs";
import {
  fetchAlbumById,
  fetchPlaylistById,
  fetchSongsById,
} from "@/action/fetch";
import Image from "next/image";
export function CustomCards({ data }: { data: any }) {
  const { setActiveMusic, setSongs } = useStoreSongs();

  const PlayAlbum = async (data: any) => {
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
      {data.map((item: any) => (
        <div key={item.id} className="w-full max-w-sm overflow-hidden group">
          <div className="relative">
            <Image
              src={
                item.image && typeof item.image === "string"
                  ? item.image
                  : (item.image.find(
                      (image: any) => image.quality === "500x500"
                    ) ||
                      item.image[0] ||
                      {})[
                      typeof item.image.find(
                        (image: any) => image.quality === "500x500"
                      ) === "object" &&
                      item.image.find(
                        (image: any) => image.quality === "500x500"
                      ).link
                        ? "link"
                        : "url"
                    ]
              }
              alt="Card Image"
              width={500}
              height={500}
              className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-50 rounded-xl"
            />
            <div
              onClick={() => PlayAlbum(item)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <PlayIcon className="w-6 h-6 " />
            </div>
          </div>
          <Link href={`/${item.type}/${item.id}`}>
            <CardContent className="p-4">
              <div className="font-semibold truncate">{item.name}</div>
              <div className="text-sm truncate">{item.subtitle}</div>
            </CardContent>
          </Link>
        </div>
      ))}
    </div>
  );
}
