"use client";

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useTheme } from "next-themes";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  ChevronDown,
  ChevronUp,
  Maximize2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useStoreSongs } from "@/hook/useStoreSongs";
import Image from "next/image";

export default function FloatingPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const { theme, setTheme } = useTheme();

  const activeMusic = useStoreSongs((state) => state.activeMusic);
  const songs = useStoreSongs((state) => state.songs);
  const setActiveMusic = useStoreSongs((state) => state.setActiveMusic);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleVolumeChange = (value: number[]) => setVolume(value[0]);
  const handleToggleMute = () => setMuted(!muted);
  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0]);
    playerRef.current?.seekTo(value[0]);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleNextSong = () => {
    if (activeMusic && songs.length > 0) {
      const currentIndex = songs.findIndex(
        (song) => song.id === activeMusic.id
      );
      const nextIndex = (currentIndex + 1) % songs.length;
      setActiveMusic(songs[nextIndex]);
    }
  };

  const handlePreviousSong = () => {
    if (activeMusic && songs.length > 0) {
      const currentIndex = songs.findIndex(
        (song) => song.id === activeMusic.id
      );
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setActiveMusic(songs[previousIndex]);
    }
  };

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    // const handleKeyPress = (e: KeyboardEvent) => {
    //   if (e.code === "Space") {
    //     e.preventDefault();
    //     handlePlayPause();
    //   }
    // };
    // window.addEventListener("keydown", handleKeyPress);
    // return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying]);

  if (!activeMusic) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg transition-all duration-300 z-50",
        isExpanded ? "h-full" : "h-20",
        "dark:bg-card dark:border-accent"
      )}
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Mobile Expand Button */}
        <button
          className={cn(
            "md:hidden absolute isExpanded",
            isExpanded ? "top-4" : "top-0",
            "left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-1 z-10 dark:bg-card dark:border-accent"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-primary" />
          ) : (
            <ChevronUp className="w-4 h-4 text-primary" />
          )}
        </button>

        {/* Main Player Content */}
        <div
          className={cn(
            "flex items-center justify-between h-20 px-4",
            isExpanded ? "md:flex hidden" : "flex"
          )}
        >
          {/* Album and Track Info */}
          <div className="flex items-center space-x-4 w-1/3">
            <Image
              height={500}
              width={500}
              src={
                activeMusic.image.find((image) => image.quality === "500x500")
                  ?.url || "/placeholder.svg?height=48&width=48"
              }
              alt={activeMusic.name}
              className="w-12 h-12 rounded-md"
            />
            <div className="overflow-hidden">
              <h3 className="text-sm font-medium truncate text-foreground">
                {activeMusic.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {activeMusic.artists.primary[0].name}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <Button variant="ghost" size="icon" onClick={handlePreviousSong}>
                <SkipBack className="w-5 h-5 text-primary" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextSong}>
                <SkipForward className="w-5 h-5 text-primary" />
              </Button>
            </div>
            <div className="w-full max-w-md flex items-center space-x-2">
              <span className="text-xs text-muted-foreground w-8 text-right">
                {formatTime(played * duration)}
              </span>
              <Slider
                value={[played]}
                max={1}
                step={0.01}
                className="w-full"
                onValueChange={handleSeekChange}
              />
              <span className="text-xs text-muted-foreground w-8">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center space-x-2 w-1/3 justify-end">
            <Button variant="ghost" size="icon" onClick={handleToggleMute}>
              {muted ? (
                <VolumeX className="w-5 h-5 text-primary" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-5 h-5 text-primary" />
              ) : (
                <Volume2 className="w-5 h-5 text-primary" />
              )}
            </Button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              className="w-24"
              onValueChange={handleVolumeChange}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Maximize2 className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>

        {/* Expanded Mobile View */}
        {isExpanded && (
          <div className="md:hidden flex-grow flex flex-col items-center justify-center p-4 space-y-6">
            <div>
              <Image
                height={500}
                width={500}
                src={
                  activeMusic.image.find((image) => image.quality === "500x500")
                    ?.url || "/placeholder.svg?height=300&width=300"
                }
                alt={activeMusic.name}
                className="w-64 h-64 rounded-lg shadow-lg"
              />
              <div className="w-full flex items-center space-x-4 px-4">
                <Button variant="ghost" size="icon" onClick={handleToggleMute}>
                  {muted ? (
                    <VolumeX className="w-4 h-4 text-primary" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-4 h-4 text-primary" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary" />
                  )}
                </Button>
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.01}
                  className="w-full h-2"
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {activeMusic.name}
              </h2>
              <p className="text-lg text-muted-foreground">
                {activeMusic.artists.primary[0].name}
              </p>
            </div>
            <div className="w-full max-w-md flex items-center space-x-2 px-4">
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatTime(played * duration)}
              </span>
              <Slider
                value={[played]}
                max={1}
                step={0.01}
                className="w-full"
                onValueChange={handleSeekChange}
              />
              <span className="text-xs text-muted-foreground w-10">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="icon" onClick={handlePreviousSong}>
                <SkipBack className="w-8 h-8 text-primary" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="w-16 h-16" />
                ) : (
                  <Play className="w-16 h-16" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextSong}>
                <SkipForward className="w-8 h-8 text-primary" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden ReactPlayer */}
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={
            activeMusic?.downloadUrl.find(
              (downloadUrl) => downloadUrl.quality === "320kbps"
            )?.url
          }
          width="100%"
          height="100%"
          playing={isPlaying}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={setDuration}
          onEnded={handleNextSong}
          config={{
            file: {
              forceAudio: true,
            },
          }}
        />
      </div>
    </div>
  );
}