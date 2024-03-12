"use server";
import { SummaryData } from "@/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { allIdeas } from "../gpt";

import { fetchSubtitlesFromVideoID } from "@/lib/subtitles";

async function insertSummaryToDB(summaryData: SummaryData) {
  const supabase = createServerActionClient({ cookies });

  const result = await supabase
    .from("summary")
    .insert({
      youtube_video_id: summaryData.youtubeVideoId,
      summary: summaryData.summary,
      missing_ideas: summaryData.missingIdeas,
      correct_ideas: summaryData.correctIdeas,
      wrong_ideas: summaryData.wrongIdeas,
    })
    .single();

  const { error } = result;
  if (error) {
    throw new Error(`Error adding to database: ${error.message}`); // throw new Error
  }
}

export async function createSummary(videoId: string, summary: string) {
  try {
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

    const summaryData: SummaryData = {
      youtubeVideoId: videoId,
      summary,
      missingIdeas: JSON.stringify(missingIdeas),
      correctIdeas: JSON.stringify(correctIdeas),
      wrongIdeas: JSON.stringify(wrongIdeas),
    };

    await insertSummaryToDB(summaryData);

    return summaryData;
  } catch (error) {
    throw new Error("Error creating summary: " + error);
  }
}

export async function deleteSummary(id: string) {
  try {
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.from("summary").delete().match({ id });
    if (error) throw new Error(error.message);
    return { data: { success: true } };
  } catch (error) {
    return {
      error,
    };
  }
}
