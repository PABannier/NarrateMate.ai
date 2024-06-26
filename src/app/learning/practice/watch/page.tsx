"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { YoutubePlayer } from "@/components/youtube_player";
import { useEffect, useRef, useState } from "react";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { ResponseCard } from "@/components/response_card";
import { Icons } from "@/components/icons";
import { toast } from "react-hot-toast";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { TimeStampCard } from "@/components/timestamp_card";
import { createSummary } from "@/lib/database/mutations";
import PageHeader from "@/components/page-header";
import { useStore } from "@/app/zustand";
import { DbSummaryData, FormattedTimeStamp } from "@/types/types";
import { Disabled } from "@/components/disabled";
import { useSearchParams } from "next/navigation";

interface ISubtitleTimestamps {
  languageCode: any;
  subtitles: FormattedTimeStamp[];
}

export default function PracticePage() {
  const [videoId, setVideoId] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [subtitleTimestamps, setSubtitleTimestamps] = useState<
    ISubtitleTimestamps[]
  >([]);
  const [summary, setSummary] = useState<DbSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [captionHeight, setCaptionHeight] = useState(0);
  const [time, setTime] = useState(0);
  // trick to re-render the youtube player on play
  const [playerKey, setPlayerKey] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const updateCurrentSummaryId = useStore(
    (state) => state.updateCurrentSummaryId
  );
  const { insertSummary } = useStore();
  const ref = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("videoId");
    if (id) {
      setYoutubeURL(`https://www.youtube.com/watch?v=${id}`);
      setVideoId(id);
      setPlayerKey(playerKey + 1);
      setIsDisabled(false);
      console.log(subtitleTimestamps, isLoading);
    }
  }, [searchParams]);

  const handlePlay = () => {
    const url = youtubeURL;
    const extractedId = extractYouTubeVideoId(url);
    if (extractedId) {
      setVideoId(extractedId);
      setPlayerKey(playerKey + 1);
      setIsDisabled(false);
    }

    // get video length to limit only to videos that are short
  };

  const handleSubmitSummary = async () => {
    setIsLoading(true);

    try {
      const { insertedSummary, subtitleTimestamps } = await createSummary(
        videoId,
        textArea
      );

      insertSummary(insertedSummary);
      updateCurrentSummaryId(insertedSummary.id);
      setSummary(insertedSummary);
      setSubtitleTimestamps(subtitleTimestamps);
    } catch (e) {
      toast.error((e as Error).message);
      setSubtitleTimestamps([]);
      setSummary(null);
    }

    setIsLoading(false);
  };

  const handleClickOnSubtitles = () => {
    if (subtitleTimestamps.length > 0) {
      setShowSubtitles(!showSubtitles);
    }
  };

  const handleTimeStampClick = (timestamp: number) => () => {
    const startTimeInSeconds = Math.floor(timestamp);
    setTime(startTimeInSeconds);
  };

  const executeScroll = () => {
    if (ref && ref.current) ref.current.scrollIntoView();
  };

  return (
    <div className="h-full px-4 py-6 lg:px-8 space-y-7 ">
      <PageHeader
        title="New video"
        description="Watch and summarize a YouTube video"
      />
      {/* Step 1 */}
      <div className="grid lg:grid-cols-4 space-y-5">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight">Step 1</h2>
          <p className="text-sm text-muted-foreground">Enter a YouTube URL</p>
        </div>
        <div className="lg:col-span-2 flex gap-2">
          <Input
            name="youtube-url"
            value={youtubeURL}
            onChange={(e) => setYoutubeURL(e.target.value)}
          />
          <Button variant="outline" type="submit" onClick={handlePlay}>
            Play
          </Button>
        </div>
      </div>

      {/* Step 2 */}
      <div className={`${!isDisabled && "grid lg:grid-cols-4"}`}>
        <Disabled
          disabled={isDisabled}
          spinner={false}
          className="grid lg:grid-cols-4"
        >
          <div className="lg:col-span-2">
            <div className="block space-y-5">
              <div className="flex justify-between items-end">
                <div className="flex flex-col " ref={ref}>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Step 2
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Watch the YouTube Video
                  </p>
                  <p className="text-sm text-muted-foreground">
                    (Subtitles will be available to view after submitting a
                    summary)
                  </p>
                </div>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleClickOnSubtitles}
                  disabled={subtitleTimestamps.length === 0 || isLoading}
                >
                  <FaRegClosedCaptioning className="mr-2 h-4 w-4" />
                  {showSubtitles ? "Hide subtitles" : "Show subtitles"}
                </Button>
              </div>
              <div className="object-contain">
                <YoutubePlayer
                  videoId={videoId}
                  autoPlay={true}
                  title="My Video"
                  setCaptionHeight={setCaptionHeight}
                  time={time}
                  playerKey={playerKey}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:ml-5 self-end">
            {subtitleTimestamps && showSubtitles && (
              <TimeStampCard
                multiLingualTimeStamps={subtitleTimestamps}
                height={captionHeight}
                onTimeStampClick={handleTimeStampClick}
              />
            )}
          </div>
        </Disabled>
      </div>
      {/* Step 3 */}
      <div className={`${!isDisabled && "grid lg:grid-cols-4"}`}>
        <Disabled
          disabled={isDisabled}
          spinner={false}
          className="grid lg:grid-cols-4 space-y-5"
        >
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-semibold tracking-tight">Step 3</h2>
            <p className="text-sm text-muted-foreground">
              Write a summary of the video
            </p>
          </div>
          <div className="lg:col-span-2 space-y-2">
            <Textarea
              name="summary"
              className="min-h-[200px]"
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={handleSubmitSummary}
              >
                Submit
                {isLoading && (
                  <Icons.spinner className="h-4 w-4 animate-spin ml-2" />
                )}
              </Button>
            </div>
          </div>
        </Disabled>
      </div>

      {summary && !isLoading && (
        <div className="grid lg:grid-cols-4 space-y-5">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-semibold tracking-tight">Step 4</h2>
            <p className="text-sm text-muted-foreground">
              Response from ChatGPT
            </p>
          </div>
          <div className="lg:col-span-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <ResponseCard
              title="Correct Ideas"
              description="Here are the ideas from the video that you got correct."
              ideas={summary.correctIdeas}
              className="bg-green-500"
              onTimeStampClick={handleTimeStampClick}
              scrollFunction={executeScroll}
            />
            <ResponseCard
              title="Missing Ideas"
              description="Here are the ideas from the video that you missed."
              ideas={summary.missingIdeas}
              className="bg-orange-500"
              onTimeStampClick={handleTimeStampClick}
              scrollFunction={executeScroll}
            />
            <ResponseCard
              title="Wrong Ideas"
              description="Here are the ideas from the video that you got wrong."
              ideas={summary.wrongIdeas}
              className="bg-red-500"
              onTimeStampClick={handleTimeStampClick}
              scrollFunction={executeScroll}
            />
          </div>
        </div>
      )}
    </div>
  );
}
