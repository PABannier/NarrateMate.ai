import { buildGptTranslationPayload, sendToGpt } from "@/lib/gpt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // get the word from the request
  if (req.nextUrl.searchParams.get("word")) {
    const word = req.nextUrl.searchParams.get("word");
    console.log(word);

    // const payload = buildGptTranslationPayload(word!);
    // const completion = await sendToGpt(payload);
    // const { translation, definition } = JSON.parse(completion!);

    const translation = `translation of ${word}`;
    const definition = `definition of ${word}`;

    return NextResponse.json({ translation, definition }, { status: 200 });
  }

  return NextResponse.json(
    { error: "Missing word to translate" },
    { status: 400 }
  );
}
