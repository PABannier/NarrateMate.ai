export function extractYouTubeVideoId(youtubeUrl: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = youtubeUrl.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

export function getYouTubeThumnailUrl(videoId: string) {
  return "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg";
}

export function getYouTubeThumbnailFromId(id: string) {
  return `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export async function getYouTubeVideoTitle(videoId: string) {
  const response = await fetch(`https://youtube.com/watch?v=${videoId}`);
  const data = await response.text();

  const regex = /<meta name="title" content="([^"]+)"/;
  const match = data.match(regex);

  if (!match) {
    return "";
  }
  return match[1];
}
type LanguageCodes = {
  [key: string]: string;
};
export const languageCodes: LanguageCodes = {
  am: "Amharic",
  ar: "Arabic",
  eu: "Basque",
  bn: "Bengali",
  "en-GB": "English (UK)",
  "pt-BR": "Portuguese (Brazil)",
  bg: "Bulgarian",
  ca: "Catalan",
  chr: "Cherokee",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English (US)",
  et: "Estonian",
  fil: "Filipino",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  iw: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  kn: "Kannada",
  ko: "Korean",
  lv: "Latvian",
  lt: "Lithuanian",
  ms: "Malay",
  ml: "Malayalam",
  mr: "Marathi",
  no: "Norwegian",
  pl: "Polish",
  "pt-PT": "Portuguese (Portugal)",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  "zh-CN": "Chinese (PRC)",
  sk: "Slovak",
  sl: "Slovenian",
  es: "Spanish",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  "zh-TW": "Chinese (Taiwan)",
  tr: "Turkish",
  ur: "Urdu",
  uk: "Ukrainian",
  vi: "Vietnamese",
  cy: "Welsh",
};
