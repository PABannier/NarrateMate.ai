import React from "react";

import { Separator } from "@/components/ui/separator";
import { placeholderData } from "@/components/data";
import { VideoCard } from "@/components/video-card";
import { getYouTubeThumnailUrl, getYouTubeVideoTitle } from "@/lib/youtube";

function HistoryPage() {
  return (
    <div className="h-full px-4 py-6 lg:px-8 space-y-7">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">History</h2>
          <p className="text-sm text-muted-foreground">Your past videos</p>
        </div>
        <Separator />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {placeholderData.map((data, index) => (
          <div className="col-span-1">
            <VideoCard
              key={index}
              title={getYouTubeVideoTitle(data.videoId)}
              createdAt={data.createdAt}
              thumbnailUrl={getYouTubeThumnailUrl(data.videoId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
