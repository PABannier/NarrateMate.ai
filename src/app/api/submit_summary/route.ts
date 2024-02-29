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
    const subtitleTimestamps = await fetchSubtitlesFromVideoID(body.videoId);

    // uncomment to use OpenAI
    // const subtitles = subtitleTimestamps.map((line) => line.text).join(" ");
    // const payload = buildGptPayload(subtitles, body.summary);
    // const completion = await sendToGpt(payload);

    // const { missingIdeas, wrongIdeas, correctIdeas } = JSON.parse(completion!);

    const missingIdeas = [
      "Sylvia is going to have a younger sibling",
      "The younger sibling will be born in October",
    ];
    const correctIdeas: string[] = [];
    const wrongIdeas = [
      "The name of the character is Sylvia and not Sohee",
      "Sylvia is an only child",
    ];

    return NextResponse.json(
      { missingIdeas, wrongIdeas, correctIdeas, subtitleTimestamps },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
