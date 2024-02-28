import { NextRequest, NextResponse } from "next/server";
import { fetchSubtitlesFromVideoID } from "@/lib/subtitles";
import { buildGptPayload, sendToGpt } from "@/lib/gpt";

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
    const subtitles = await fetchSubtitlesFromVideoID(body.videoId);
    const payload = buildGptPayload(subtitles, body.summary);
    const completion = await sendToGpt(payload);

    const { missingIdeas, wrongIdeas, correctIdeas } = JSON.parse(completion!);

    return NextResponse.json(
      { missingIdeas, wrongIdeas, correctIdeas },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
