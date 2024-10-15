import { useStoreSongs } from "@/hook/useStoreSongs";
import CustomImage from "../ui/image";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { fetchLyricsById } from "@/action/fetch";
import { useEffect, useState } from "react";

export default function SidebarPlayer() {
  const { activeMusic } = useStoreSongs();
  const [lyrics, setLyrics] = useState<any>({});

  useEffect(() => {
    if (activeMusic) {
      fetchLyricsById(activeMusic.id || "").then((data) => {
        setLyrics(data);
      });
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
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-6 relative">
          <div>
            <CustomImage
              height={500}
              width={500}
              src={
                activeMusic?.image.find((image) => image.quality === "500x500")
                  ?.url || "/placeholder.svg?height=300&width=300"
              }
              alt={`${activeMusic?.name}`}
              className="w-64 h-64 rounded-lg shadow-lg"
            />
          </div>
          <ScrollArea className="h-[400px] w-full max-w-2xl">
            <div className="space-y-4">
              <pre className="whitespace-pre-wrap text-lg leading-relaxed">
                <div
                  className="space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: lyrics.data?.lyrics || "<p>No Lyrics Found</p>",
                  }}
                />
              </pre>
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
