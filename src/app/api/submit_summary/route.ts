import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { fetchSubtitlesFromVideoID } from "@/lib/subtitles";
import { buildGptPayload, sendToGpt } from "@/lib/gpt";
import { allIdeas } from "@/lib/gpt";
import { SummaryData } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import type { Database } from "@/lib/database.types";

async function createSummary(summaryData: SummaryData) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
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
  if (error) throw new Error(`Error adding to database: ${error.message}`); // throw new Error

  revalidatePath("/learning/practice/new");
  return JSON.stringify(result);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.videoId && !body.summary) {
    return NextResponse.json(
      { error: "Missing videoId and summary" },
      { status: 400 }
    );
  } else if (!body.videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  } else if (!body.summary) {
    return NextResponse.json({ error: "Missing summary" }, { status: 400 });
  }

  try {
    const subtitleTimestamps = await fetchSubtitlesFromVideoID(body.videoId);

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
      youtubeVideoId: body.videoId,
      summary: body.summary,
      missingIdeas: JSON.stringify(missingIdeas),
      correctIdeas: JSON.stringify(correctIdeas),
      wrongIdeas: JSON.stringify(wrongIdeas),
    };

    // post to database
    const dbResponse = await createSummary(summaryData);

    return NextResponse.json(
      { missingIdeas, wrongIdeas, correctIdeas, subtitleTimestamps },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
