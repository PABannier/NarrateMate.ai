import React from "react";
import { VideoCard } from "@/components/video-card";
import { getYouTubeThumnailUrl } from "@/lib/youtube";
import { getAllSummaries } from "@/lib/database/queries";
import Videos from "@/components/videos";

async function HistoryList() {
  const historyData = await getAllSummaries();
  return <Videos historyData={historyData} />;
}

export default HistoryList;
