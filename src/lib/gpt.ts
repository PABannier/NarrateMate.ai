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

export const allIdeas = {
  missingIdeas: [
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
  ],
  wrongIdeas: [{ idea: "Sohee is a girl.", timestamp: null }],
  correctIdeas: [
    {
      idea: "Sohee's younger sibling will be born in October.",
      timestamp: "04:48",
    },
  ],
};
