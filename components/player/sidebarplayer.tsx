import { useStoreSongs } from "@/hook/useStoreSongs";
import CustomImage from "../ui/image";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { fetchLyricsById } from "@/action/fetch";
import { useEffect, useRef, useState } from "react";

export default function SidebarPlayer() {
  const { activeMusic } = useStoreSongs();
  const [lyrics, setLyrics] = useState<any>({});
  const lyricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeMusic) {
      fetchLyricsById(`${activeMusic.id}` || "").then((data) => {
        setLyrics(data);
      });
      // Scroll lyrics to top when song changes
      if (lyricsRef.current) {
        lyricsRef.current.scrollTop = 0;
      }
    }
  }, [activeMusic]);

  if (!activeMusic)
    return (
      <>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-6 relative">
            <div>
              <Skeleton className="w-64 h-64 rounded-lg shadow-lg" />
            </div>
            <Skeleton className="h-[400px] w-full max-w-2xl">
              <div className="space-y-4">
                <Skeleton className="whitespace-pre-wrap text-lg leading-relaxed h-20" />
                <Skeleton className="whitespace-pre-wrap text-lg leading-relaxed h-20" />
                <Skeleton className="whitespace-pre-wrap text-lg leading-relaxed h-20" />
              </div>
            </Skeleton>
          </div>
        </div>
      </>
    );

  return (
    <>
      <ScrollArea className="h-[100vh] ">
        <div className="flex h-full max-h-[100vh] flex-col bg-gradient-to-b from-card dark:to-black ">
          <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-2">
            <div className="w-80 h-80 relative group">
              <CustomImage
                height={500}
                width={500}
                src={
                  activeMusic?.image.find(
                    (image) => image.quality === "500x500"
                  )?.url || "/placeholder.svg?height=500&width=500"
                }
                alt={`${activeMusic?.name}`}
                className="w-full h-full object-cover rounded-md shadow-lg p-2"
              />
              <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className=" text-2xl font-bold">Now Playing</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">{activeMusic?.name}</h2>
            </div>
            <ScrollArea
              className="h-[400px] w-full max-w-[400px] bg-card rounded-md p-6"
              ref={lyricsRef}
            >
              {lyrics.data?.lyrics ? (
                <div
                  className="space-y-6 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: lyrics.data.lyrics.replace(/\n/g, "<br>"),
                  }}
                />
              ) : (
                <p className="text-center  text-xl">No lyrics found</p>
              )}
            </ScrollArea>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
