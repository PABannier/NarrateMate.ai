import React from "react";
import { VideoCard } from "@/components/video-card";
import Link from "next/link";
import { getYouTubeThumnailUrl, getYouTubeVideoTitle } from "@/lib/youtube";
import { convertKeysToCamelCase } from "@/lib/utils";
import toast from "react-hot-toast";
import { createSupabaseServerClient } from "@/lib/supabase";
import { remove } from "../[id]/actions";

export const revalidate = 60;

const getSummaries = async () => {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from("summary").select();

    if (!data) {
      throw new Error("No data found");
    }

    for (const summary of data) {
      const youtubeVideoId = summary.youtube_video_id;
      const title = await getYouTubeVideoTitle(youtubeVideoId);
      summary.title = title;
    }

    const camelCaseData = convertKeysToCamelCase(data);
    const sortedData = camelCaseData.sort((a: any, b: any) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return aDate > bDate ? -1 : 1;
    });
    return sortedData;
  } catch (error) {
    toast.error("Error getting summaries: " + error);
  }
};
async function HistoryList() {
  const historyData = await getSummaries();
  //Started implementing the handleClick but remember this will become a client component if we add interactivity
  const handleClick = (id: string) => async () => {
    const { error } = await remove(id);

    if (error) {
      toast.error((error as Error).message);
    } else toast.success("Successfully deleted summary!");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {historyData.map((data: any, index: number) => {
        return (
          <div key={index} className="col-span-1">
            <Link href={`/home/history/${data.id}`}>
              <VideoCard
                key={index}
                title={data.title}
                createdAt={data.createdAt}
                thumbnailUrl={getYouTubeThumnailUrl(data.youtubeVideoId)}
                // onClick={handleClick(data.id)}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default HistoryList;
