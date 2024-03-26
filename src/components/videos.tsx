"use client";
import { FetchedSummaryData } from "@/types";
import React, { useEffect } from "react";
import { VideoCard } from "./video-card";
import { getYouTubeThumnailUrl } from "@/lib/youtube";
import { useStore } from "@/app/zustand";
export default function Videos({
  historyData,
}: {
  historyData: FetchedSummaryData[];
}) {
  const { summariesList, updateSummariesList } = useStore();
  useEffect(() => {
    updateSummariesList(historyData);
  }, [historyData, updateSummariesList]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {summariesList.map((data: any, index: number) => {
        return (
          <div key={index} className="col-span-1">
            <VideoCard
              key={index}
              id={data.id}
              title={data.title}
              createdAt={data.createdAt}
              thumbnailUrl={getYouTubeThumnailUrl(data.youtubeVideoId)}
            />
          </div>
        );
      })}
    </div>
  );
}
