import { cookies } from "next/headers";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { getYouTubeVideoTitle } from "../youtube";
import { convertKeysToCamelCase } from "../utils";
import { cache } from "react";
import { unstable_cache } from "next/cache";
const getAllFromDB = unstable_cache(
  async (supabase: SupabaseClient) => {
    const { data } = await supabase.from("summary").select("*");

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
  },
  [],
  { revalidate: 2 }
);

export const getAllSummaries = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  return await getAllFromDB(supabase);
};
