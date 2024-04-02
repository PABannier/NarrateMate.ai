"use server";
import { WordEntry, RawSummaryData, DbSummaryData } from "@/types/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { allIdeas } from "../gpt";

import { fetchSubtitlesFromVideoID } from "@/lib/subtitles";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";
import { getYouTubeVideoTitle } from "../youtube";

async function insertSummaryToDB(
  summaryData: RawSummaryData
): Promise<DbSummaryData> {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const result = await supabase
    .from("summary")
    .insert({
      youtube_video_id: summaryData.youtubeVideoId,
      summary: summaryData.summary,
      missing_ideas: JSON.stringify(summaryData.missingIdeas),
      correct_ideas: JSON.stringify(summaryData.correctIdeas),
      wrong_ideas: JSON.stringify(summaryData.wrongIdeas),
      title: summaryData.title,
    })
    .select();

  const { data, error } = result;

  if (error) {
    throw new Error(`Error adding to database: ${error.message}`); // throw new Error
  }

  const insertedSummary: DbSummaryData = {
    youtubeVideoId: data![0].youtube_video_id!,
    summary: data![0].summary!,
    missingIdeas: JSON.parse(data![0].missing_ideas!),
    correctIdeas: JSON.parse(data![0].correct_ideas!),
    wrongIdeas: JSON.parse(data![0].wrong_ideas!),
    id: data![0].id!,
    userId: data![0].user_id!,
    createdAt: new Date(Date.parse(data![0].created_at!)), // Convert parsed timestamp to Date object
    title: data![0].title!,
  };

  return insertedSummary;
}

export async function createSummary(
  videoId: string,
  summary: string
): Promise<{ insertedSummary: DbSummaryData; subtitleTimestamps: any }> {
  try {
    const title = await getYouTubeVideoTitle(videoId);
    const subtitleTimestamps = await fetchSubtitlesFromVideoID(videoId);
    // uncomment to use OpenAI
    let openAISubtitles = null;
    const enSubtitles = subtitleTimestamps.filter(
      (sub) => sub.languageCode === "en"
    );

    if (enSubtitles.length > 0) {
      openAISubtitles = enSubtitles[0];
    } else {
      openAISubtitles = subtitleTimestamps[0];
    }

    // const subtitles = openAISubtitles.subtitles
    //   .map((line) => `${line.formattedStart} : ${line.text}`)
    //   .join("\n");
    // const payload = buildGptPayload(subtitles, body.summary);
    // const completion = await sendToGpt(payload);

    // const { missingIdeas, wrongIdeas, correctIdeas } = JSON.parse(completion!);
    // console.log("missing ideas: ", missingIdeas);
    // console.log("wrong ideas: ", wrongIdeas);
    // up to here for using OpenAI

    // uncomment for mock data
    const { missingIdeas, wrongIdeas, correctIdeas } = allIdeas;

    const summaryData: RawSummaryData = {
      youtubeVideoId: videoId,
      summary,
      missingIdeas,
      correctIdeas,
      wrongIdeas,
      title,
    };
    const insertedSummary = await insertSummaryToDB(summaryData);
    return { insertedSummary, subtitleTimestamps };
  } catch (error) {
    throw new Error("Error creating summary: " + error);
  }
}

export async function deleteSummary(id: string) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });
    const { error } = await supabase.from("summary").delete().match({ id });
    if (error) throw new Error(error.message);
    return { data: { success: true } };
  } catch (error) {
    return {
      error,
    };
  }
}

export async function addWord({
  word,
  translation,
  definition,
  summaryId,
}: WordEntry) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });

    const { error } = await supabase
      .from("word")
      .insert({
        word: word,
        translation: translation,
        definition: definition,
        summary_id: summaryId,
      })
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/learning/review/words");
    return JSON.stringify({ data: { success: true } });
  } catch (error) {
    console.log((error as Error).message);
    return JSON.stringify({
      error,
    });
  }
}

export async function deleteWords(ids: string[]) {
  try {
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });
    const { error } = await supabase.from("word").delete().in("id", ids);
    if (error) throw new Error(error.message);
    revalidatePath("/learning/review/words");
    return JSON.stringify({ data: { success: true } });
  } catch (error) {
    console.log((error as Error).message);
    return JSON.stringify({
      error,
    });
  }
}
