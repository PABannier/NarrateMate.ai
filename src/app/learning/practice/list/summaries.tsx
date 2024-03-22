import React from "react";
import { VideoCard } from "@/components/video-card";
import { getYouTubeThumnailUrl } from "@/lib/youtube";
import { getAllSummaries } from "@/lib/database/queries";

async function HistoryList() {
  const historyData = await getAllSummaries();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
}

export default HistoryList;
