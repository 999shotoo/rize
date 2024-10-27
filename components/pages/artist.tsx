"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle } from "lucide-react";
import { useStoreSongs } from "@/hook/useStoreSongs";
import { formatTime } from "@/hook/usetformattime";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { CustomCards } from "../cards";
import CustomImage from "../ui/image";

export default function ArtistClientPage({ data }: { data: any }) {
  const { setActiveMusic, setSongs, activeMusic } = useStoreSongs();

  const onClickPlayButton = () => {
    setSongs(data.topSongs);
    setActiveMusic(data.topSongs[0]);
  };

  const onClickOnSong = (item: any) => {
    setSongs(data.topSongs);
    setActiveMusic(item);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <CustomImage
          src={
            data.image.find(
              (image: { quality: string }) => image.quality === "500x500"
            ).url
          }
          alt="Dua Lipa"
          width={200}
          height={200}
          className="rounded-full"
        />
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
          <p className="text-muted-foreground mb-2">
            {data.followerCount} followers
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Button className="rounded-full" onClick={onClickPlayButton}>
              <PlayCircle className="mr-2 h-4 w-4" /> Play
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="songs" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="singles">Singles</TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          <div className="space-y-4">
            {data.topSongs.map(
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
        </TabsContent>
        <TabsContent value="albums">
          <div className="space-y-4">
            <CustomCards data={data.topAlbums} />
          </div>
        </TabsContent>
        <TabsContent value="singles">
          <div className="space-y-4">
            <CustomCards data={data.singles} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
