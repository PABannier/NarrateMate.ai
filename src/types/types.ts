export interface TimeStamp {
  text: string;
  start: string;
  dur: string;
}

export interface Idea {
  idea: string;
  timestamp: string | null;
}

export interface FormattedTimeStamp {
  text: string;
  start: string;
  formattedStart: string;
  dur: string;
}

export interface RawSummaryData {
  title?: string;
  youtubeVideoId: string;
  summary: string;
  missingIdeas: Idea[];
  correctIdeas: Idea[];
  wrongIdeas: Idea[];
}

export interface DbSummaryData extends RawSummaryData {
  id: string;
  userId: string;
  createdAt: Date;
}

export interface MultiLingualTimeStamps {
  languageCode: string;
  subtitles: FormattedTimeStamp[];
}

export interface WordEntry {
  word: string;
  translation: string;
  definition: string;
  summaryId: string;
}
