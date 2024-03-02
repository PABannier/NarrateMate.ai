import { NextRequest, NextResponse } from "next/server";
import { fetchSubtitlesFromVideoID } from "@/lib/subtitles";
import { buildGptPayload, sendToGpt } from "@/lib/gpt";
import { allIdeas } from "@/lib/gpt";

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

    return NextResponse.json(
      { missingIdeas, wrongIdeas, correctIdeas, subtitleTimestamps },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
