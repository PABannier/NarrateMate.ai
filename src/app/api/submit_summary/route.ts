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
    // const subtitles = subtitleTimestamps
    //   .map((line) => `${line.formattedStart} : ${line.text}`)
    //   .join("\n");
    // const payload = buildGptPayload(subtitles, body.summary);
    // const completion = await sendToGpt(payload);

    // const { missingIdeas, wrongIdeas, correctIdeas } = JSON.parse(completion!);
    // console.log("missing ideas: ", missingIdeas);
    // console.log("wrong ideas: ", wrongIdeas);
    // up to here for using OpenAI

    // uncomment for mock data
    const missingIdeas = [
      { idea: "Sohee is 7 years old.", timestamp: "00:15" },
      {
        idea: "There are three people in Sohee's family: Dad, Mom, and Sohee.",
        timestamp: "00:19",
      },
      {
        idea: "Sohee doesn't have an older sister. She doesn't have a big brother either.",
        timestamp: "00:32",
      },
      { idea: "Sohee is an only daughter.", timestamp: "00:40" },
      { idea: "Sohee's friend has a younger sibling.", timestamp: "00:48" },
      {
        idea: "Sohee wishes she had a younger sibling too.",
        timestamp: "00:56",
      },
      {
        idea: "Sohee's mom and dad told her that her younger sibling will be born in October.",
        timestamp: "01:04",
      },
      {
        idea: "Sohee is very happy and wants to meet her new younger sibling soon.",
        timestamp: "01:19",
      },
      { idea: "Sohee is 7 years old.", timestamp: "03:03" },
      { idea: "There are 3 people in Sohee's family.", timestamp: "03:16" },
      {
        idea: "Sohee doesn't have an older sister or brother.",
        timestamp: "03:33",
      },
      {
        idea: "Sohee doesn't have any younger siblings and is an only child.",
        timestamp: "03:58",
      },
      { idea: "Sohee's friend has a younger sibling.", timestamp: "04:11" },
      {
        idea: "Sohee is happy because she is going to have a younger sibling.",
        timestamp: "04:29",
      },
      {
        idea: "Sohee wants to meet her younger sibling soon.",
        timestamp: "05:04",
      },
    ];
    const wrongIdeas = [{ idea: "Sohee is a girl.", timestamp: null }];
    const correctIdeas = [
      {
        idea: "Sohee's younger sibling will be born in October.",
        timestamp: "04:48",
      },
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
