import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const buildGptPayload = (subtitles: string, summary: string) => {
    const systemPrompt = `You are given the subtitles of a video and a summary made by a student. Your task is to evaluate the summary.

    Here are the instructions to evaluate my summary:
    1. Your output is in JSON format.
    2. The JSON object has 3 keys: "missingIdeas", "correctIdeas", "wrongIdeas".
    3. The value of "missingIdeas" is a list of ideas that are in the subtitles but not articulated in the summary.
    4. The value of "correctIdeas" is a list of ideas that are in both the subtitles and the summary.
    5. The value of "wrongIdeas" is a list of ideas that are in the summary but not in the subtitles.
    6. The subtitles of the video may be in another language than the summary. You still reply in English.
    `;

    const userPrompt = `
    Here are the subtitles of the video: ${subtitles}.

    Here is my summary: ${summary}.
    `;

    const messages = [
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: userPrompt
        },
    ]

    return messages;
}

export const sendToGpt = async (payload: any) => {
    const completion = await openai.chat.completions.create({
        messages: payload,
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
    });

    return completion.choices[0].message.content;
}
