"use client"

import { useStoreSongs } from "@/hook/useStoreSongs"
import CustomImage from "../ui/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchLyricsById } from "@/action/fetch"
import { useEffect, useRef, useState } from "react"

export default function SidebarPlayer() {
  const { activeMusic, currentTime, duration } = useStoreSongs()
  const [lyrics, setLyrics] = useState<any>({})
  const [parsedLyrics, setParsedLyrics] = useState<{ time: number; text: string }[]>([])
  const [loading, setLoading] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const activeLyricRef = useRef<HTMLParagraphElement>(null)
  const lastActiveIndex = useRef<number>(-1)

  useEffect(() => {
    if (activeMusic) {
      setLoading(true)
      fetchLyricsById(activeMusic.artists.primary[0].name, activeMusic.name, activeMusic.album.name, duration)
        .then((data) => {
          setLyrics(data)
          if (data?.syncedLyrics) {
            parseSyncedLyrics(data.syncedLyrics)
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [activeMusic, duration])

  const parseSyncedLyrics = (syncedLyrics: string) => {
    if (!syncedLyrics) return

    const lines = syncedLyrics.split("\n")
    const parsed = lines
      .map((line) => {
        const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\] (.+)/)
        if (match) {
          const minutes = Number.parseInt(match[1], 10)
          const seconds = Number.parseFloat(match[2])
          const time = minutes * 60 + seconds // Convert to total seconds
          return { time, text: match[3] }
        }
        return null
      })
      .filter(Boolean) as { time: number; text: string }[]

    setParsedLyrics(parsed)
  }

  // Find the current active lyric index based on currentTime
  const findActiveLyricIndex = () => {
    if (!parsedLyrics.length) return -1

    // Find the last lyric that should be active based on time
    for (let i = parsedLyrics.length - 1; i >= 0; i--) {
      if (parsedLyrics[i].time <= currentTime * duration) {
        return i
      }
    }
    return -1
  }

  // Auto-scroll to the active lyric
  useEffect(() => {
    const activeIndex = findActiveLyricIndex()

    // Only scroll if the active lyric has changed
    if (activeIndex !== -1 && activeIndex !== lastActiveIndex.current) {
      lastActiveIndex.current = activeIndex

      if (activeLyricRef.current) {
        activeLyricRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [currentTime, parsedLyrics])

  if (!activeMusic) {
    return (
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-6">
          <Skeleton className="w-64 h-64 rounded-lg" />
          <div className="w-full space-y-2">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
          <div className="w-full space-y-4 mt-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[100vh] flex-col bg-gradient-to-b from-card dark:to-black">
      <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-6">
        <div className="relative group">
          <CustomImage
            height={500}
            width={500}
            src={
              activeMusic?.image.find((image) => image.quality === "500x500")?.url ||
              "/placeholder.svg?height=500&width=500"
            }
            alt={`${activeMusic?.name}`}
            className="w-full h-full object-cover rounded-md shadow-lg p-2"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <span className="text-white text-2xl font-bold">Now Playing</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold">{activeMusic?.name}</h2>
          <h3 className="text-lg text-muted-foreground">{activeMusic.artists.primary[0].name}</h3>
        </div>

        {loading ? (
          <div className="w-full space-y-4 mt-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <ScrollArea className="w-full h-[300px]" ref={scrollAreaRef}>
            <div className="space-y-4 py-2">
              {parsedLyrics.length > 0 ? (
                parsedLyrics.map((lyric, index) => {
                  const isActive =
                    lyric.time <= currentTime * duration &&
                    (index === parsedLyrics.length - 1 || parsedLyrics[index + 1].time > currentTime * duration)

                  return (
                    <p
                      key={index}
                      ref={isActive ? activeLyricRef : null}
                      className={`text-lg transition-all duration-300 py-1 px-2 rounded ${
                        isActive
                          ? "text-primary bg-primary/10 rounded-2xl"
                          : lyric.time < currentTime * duration
                            ? "text-foreground/80"
                            : "text-muted-foreground"
                      }`}
                    >
                      {lyric.text}
                    </p>
                  )
                })
              ) : (
                <p className="text-center text-muted-foreground italic">No lyrics available</p>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
