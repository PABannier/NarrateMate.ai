import he from 'he';
import striptags from 'striptags';

interface Acc {
    start: string;
    dur: string;
    text: string;
}

export const fetchSubtitlesFromVideoID = async (videoID: string) => {
    // Fetch YouTube video page data
    const response = await fetch(`https://youtube.com/watch?v=${videoID}`);
    const data = await response.text();

    // Check if the video page contains captions
    if (!data.includes('captionTracks')) {
      console.warn(`No captions found for video: ${videoID}`);
      return "";
    }

    // Extract caption tracks JSON string from video page data
    const regex = /"captionTracks":(\[.*?\])/;
    const regexResult = regex.exec(data);

    if (!regexResult) {
      console.warn(`Failed to extract captionTracks from video: ${videoID}`);
      return "";
    }

    const [_, captionTracksJson] = regexResult;
    const captionTracks = JSON.parse(captionTracksJson);

    // Check if there are any caption tracks
    if (captionTracks.length === 0) {
      console.warn(`No caption tracks found for video: ${videoID}`);
      return "";
    }

    // Select a caption track (by default English if it exists, otherwise the first track)
    const lang = "en";
    let subtitle =
      captionTracks.find((track: any) => track.vssId === `.${lang}`) ||
      captionTracks.find((track: any) => track.vssId === `a.${lang}`) ||
      captionTracks.find(
        (track: any) => track.vssId && track.vssId.match(`.${lang}`)
      );

    // Check if the subtitle language track exists
    if (!subtitle?.baseUrl) {
      subtitle = captionTracks[0];
      console.warn(`Could not find ${lang} captions for ${videoID}`);
      console.warn(`Picking the first available language: ${subtitle.vssId}`);
    }

    // Fetch subtitles XML from the subtitle track URL
    const subtitlesResponse = await fetch(subtitle.baseUrl);
    const transcript = await subtitlesResponse.text();

    // Define regex patterns for extracting start and duration times
    const startRegex = /start="([\d.]+)"/;
    const durRegex = /dur="([\d.]+)"/;

    // Process the subtitles XML to create an array of subtitle objects
    const lines = transcript
      .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
      .replace('</transcript>', '')
      .split('</text>')
      .filter((line) => line && line.trim())
      .reduce<Acc[]>((acc, line) => {
        // Extract start and duration times using regex patterns
        const startResult = startRegex.exec(line);
        const durResult = durRegex.exec(line);

        if (!startResult || !durResult) {
          console.warn(`Failed to extract start or duration from line: ${line}`);
          return acc;
        }

        const [, start] = startResult;
        const [, dur] = durResult;

        // Clean up subtitle text by removing HTML tags and decoding HTML entities
        const htmlText = line
          .replace(/<text.+>/, '')
          .replace(/&amp;/gi, '&')
          .replace(/<\/?[^>]+(>|$)/g, '');
        const decodedText = he.decode(htmlText);
        const text = striptags(decodedText);

        // Create a subtitle object with start, duration, and text properties
        acc.push({
          start,
          dur,
          text,
        });

        return acc;
    }, []);

    const result = lines.map((line) => line.text).join(' ');

    return result;
};