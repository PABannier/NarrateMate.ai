import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { getYouTubeVideoTitle } from "../youtube";
import { convertKeysToCamelCase } from "../utils";
import { unstable_cache } from "next/cache";
import { DbSummaryData } from "@/types/types";

const getAllFromDB = unstable_cache(
  async (supabase: SupabaseClient<Database>) => {
    const { data } = await supabase.from("summary").select("*");

    if (!data) {
      throw new Error("No data found");
    }

    // Building clean objects (DbSummaryData) from raw data
    const retrievedSummaries: DbSummaryData[] = [];

    for (const summary of data) {
      const youtubeVideoId = summary.youtube_video_id;
      const title = await getYouTubeVideoTitle(youtubeVideoId!);
      retrievedSummaries.push({
        youtubeVideoId: summary.youtube_video_id!,
        summary: summary.summary!,
        missingIdeas: JSON.parse(summary.missing_ideas!),
        correctIdeas: JSON.parse(summary.correct_ideas!),
        wrongIdeas: JSON.parse(summary.wrong_ideas!),
        id: summary.id!,
        userId: summary.user_id!,
        createdAt: new Date(Date.parse(summary.created_at!)), // Convert parsed timestamp to Date object
        title,
      });
    }

    retrievedSummaries.sort((a: DbSummaryData, b: DbSummaryData) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });

    return retrievedSummaries;
  },
  []
  // { revalidate: 2 }
);

export const getAllSummaries = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  return await getAllFromDB(supabase);
};

const getAllWordsFromDb = unstable_cache(async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from("word").select("*");

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("No data found");
  }
  return data;
});
export const getAllWords = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  return await getAllWordsFromDb(supabase);
};
