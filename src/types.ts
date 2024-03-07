export interface TimeStamp {
  text: string;
  start: string;
  dur: string;
}

export interface FormattedTimeStamp {
  text: string;
  start: string;
  formattedStart: string;
  dur: string;
}

export interface SummaryData {
  youtubeVideoId: string;
  summary: string;
  missingIdeas: string;
  correctIdeas: string;
  wrongIdeas: string;
}
export interface FetchedSummaryData {
  youtubeVideoId: string;
  summary: string;
  missingIdeas: string[];
  correctIdeas: string[];
  wrongIdeas: string[];
  id: string;
  userId: string;
  createdAt: string;
}
