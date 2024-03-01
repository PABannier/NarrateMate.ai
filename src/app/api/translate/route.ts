import { buildGptTranslationPayload, sendToGpt } from "@/lib/gpt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // get the word from the request
  const body = await req.json();
  console.log(body);
  if (!body.word) {
    return NextResponse.json(
      { error: "Missing word to translate" },
      { status: 400 }
    );
  }
  try {
    // const payload = buildGptTranslationPayload(body.word);
    // const completion = await sendToGpt(payload);
    // const { translation, definition } = JSON.parse(completion!);

    const translation = `translation of ${body.word}`;
    const definition = `definition of ${body.word}`;
    return NextResponse.json({ translation, definition }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
