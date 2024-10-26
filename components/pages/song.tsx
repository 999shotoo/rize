"use client";

import { formatTime } from "@/hook/usetformattime";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { Link } from "next-view-transitions";
import { useStoreSongs } from "@/hook/useStoreSongs";
import CustomImage from "../ui/image";

export default function SongClientPage({ data }: { data: any }) {
  const { setActiveMusic, setSongs, activeMusic } = useStoreSongs();

  const onClickPlayButton = () => {
    const combinedData = {
      songs: [...data.song.data, ...data.suggestions.data],
    };
    setSongs(combinedData.songs);
    setActiveMusic(data.song.data[0]);
  };

  const onClickOnSong = (item: any) => {
    const combinedData = {
      songs: [...data.song.data, ...data.suggestions.data],
    };
    setSongs(combinedData.songs);
    setActiveMusic(item);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          <CustomImage
            src={
              data.song.data[0].image.find(
                (image: { quality: string }) => image.quality === "500x500"
              ).url
            }
            alt="Juice WRLD Remixes Playlist"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {data.song.data[0].name}
            </h1>
            <div>
              <p className="text-md text-primary">
                {data.song.data[0].type} • {data.song.data[0].playCount} plays •{" "}
                {formatTime(data.song.data[0].duration)} •{" "}
                {data.song.data[0].language}
              </p>
            </div>
            <p className="text-md text-muted-foreground">
              {data.song.data[0].label}
            </p>
            <Link href={`/artist/${data.song.data[0].artists.primary[0].id}`}>
              <p className="text-lg mb-4 text-primary">
                {data.song.data[0].artists.primary[0].name}
              </p>
            </Link>
          </div>
        </div>
        <div className="mb-8">
          <Button
            size="lg"
            className="rounded-full"
            onClick={onClickPlayButton}
          >
            <Play className="mr-2 h-5 w-5" /> Play
          </Button>
        </div>
        <div className="space-y-4">
          {data.song.data.map(
            (
              track: {
                id: any;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
                artists: { primary: any[] };
                duration:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
              },
              index: Key | null | undefined
            ) => (
              <div
                key={index}
                className={`flex items-center justify-between hover:cursor-pointer py-2 px-4 rounded-lg ${
                  activeMusic?.id === track.id ? "bg-card" : ""
                }`}
                onClick={() => onClickOnSong(track)}
              >
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-4">
                    {(index as number) + 1}
                  </span>
                  <div>
                    <p className="font-medium">{track.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {track.artists.primary
                        .map((artist: { name: any }) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground">
                  {formatTime(Number(track.duration))}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
