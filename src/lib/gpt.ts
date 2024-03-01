import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const buildGptPayload = (subtitles: string, summary: string) => {
  const systemPrompt = `You are given the subtitles and the associated timestamps of a video and a summary made by a student. Your task is to evaluate the summary.

    Here are the instructions to evaluate my summary:
    1. Your output is in JSON format.
    2. The JSON object has 3 keys: "missingIdeas", "correctIdeas", "wrongIdeas".
    3. The value of "missingIdeas" is a list of objects with two keys: "idea" and "timestamp". The value of "idea" is the idea that is in the subtitles but not articulated in the summary. The value of "timestamp" is the timestamp where that idea is expressed.
    4. The value of "correctIdeas" is a list of objects with two keys: "idea" and "timestamp". The value of "idea" is the idea that is in both the subtitles and in the summary. The value of "timestamp" is the timestamp where that idea is expressed.
    5. The value of "wrongIdeas" is a list of objects with two keys: "idea" and "timestamp". The value of "idea" is the idea that is in the summary but not in the subtitles. The value of "timestamp" is null.
    6. The subtitles of the video may be in another language than the summary. You still reply in English.
    7. Only return a single timestamp per "idea".
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
      content: userPrompt,
    },
  ];

  return messages;
};

export const buildGptTranslationPayload = (word: string) => {
  //system prompt
  const systemPrompt = `You are given a word in any language. Your task is to provide the translation and the definition in English. Provide the response as a JSON object with the keys "translation" and "definition".`;
  //user prompt
  const userPrompt = `Here is the word: ${word}.`;
  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userPrompt,
    },
  ];

  return messages;
};

export const sendToGpt = async (payload: any) => {
  const completion = await openai.chat.completions.create({
    messages: payload,
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  return completion.choices[0].message.content;
};
