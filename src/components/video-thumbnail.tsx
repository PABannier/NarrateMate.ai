"use client";
import Image from "next/image";
import { getYouTubeThumbnailFromId } from "@/lib/youtube";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { DiscoverVideo } from "@/app/learning/explore/discover/data";
import React from "react";
import { useRouter } from "next/navigation";
interface VideoThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  discoverVideo: DiscoverVideo;
  aspectRatio?: "portrait" | "video";
  width?: number;
  height?: number;
}

export function VideoThumbnail({
  discoverVideo,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: VideoThumbnailProps) {
  const router = useRouter();

  const handleClick = () => {
    const videoId = discoverVideo.id;
    router.push(`/learning/practice/watch?videoId=${videoId}`);
  };

  return (
    <div
      className={cn("space-y-3 cursor-pointer", className)}
      onClick={handleClick}
      {...props}
    >
      <div className="overflow-hidden rounded-md">
        <Image
          src={getYouTubeThumbnailFromId(discoverVideo.id)}
          alt={discoverVideo.title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105 aspect-video"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{discoverVideo.title}</h3>
        {/* <p className="text-xs text-muted-foreground">{album.artist}</p> */}
      </div>
    </div>
  );
}
