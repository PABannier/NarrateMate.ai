import React from "react";
import { VideoCard } from "@/components/video-card";
import { getYouTubeThumnailUrl, getYouTubeVideoTitle } from "@/lib/youtube";
import { convertKeysToCamelCase } from "@/lib/utils";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
const getSummaries = async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    const { data } = await supabase.from("summary").select();

    if (!data) {
      throw new Error("No data found");
    }

    for (const summary of data) {
      const youtubeVideoId = summary.youtube_video_id;
      const title = await getYouTubeVideoTitle(youtubeVideoId);
      summary.title = title;
    }
    return convertKeysToCamelCase(data);
  } catch (error) {
    toast.error("Error getting summaries: " + error);
  }
};
async function HistoryList() {
  const historyData = await getSummaries();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {historyData.map((data: any, index: number) => {
        return (
          <div key={index} className="col-span-1">
            <VideoCard
              key={index}
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
