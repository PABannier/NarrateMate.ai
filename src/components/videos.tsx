"use client";
import { DbSummaryData } from "@/types/types";
import React, { useEffect } from "react";
import { VideoCard } from "./video-card";
import { getYouTubeThumnailUrl } from "@/lib/youtube";
import { useStore } from "@/app/zustand";
export default function Videos({
  historyData,
}: {
  historyData: DbSummaryData[];
}) {
  const { summariesList, updateSummariesList } = useStore();

  useEffect(() => {
    updateSummariesList(historyData);
    console.log("history data");
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {summariesList.length == 0 ? (
        <>
          {historyData.map((data: any, index: number) => {
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
