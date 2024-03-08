"use client";
import PageHeader from "@/components/page-header";
import { YoutubePlayer } from "@/components/youtube_player";
import { TimeStampCard } from "@/components/timestamp_card";
import { ResponseCard } from "@/components/response_card";
import { useRef, useState } from "react";
import { MultiLingualTimeStamps } from "@/types";
import { DeleteButton } from "./components/delete-button";

export default function DetailsPage({ params }: { params: { id: string } }) {
  const [videoId, setVideoId] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [summary, setSummary] = useState("");
  const [correctIdeas, setCorrectIdeas] = useState([]);
  const [missingIdeas, setMissingIdeas] = useState([]);
  const [wrongIdeas, setWrongIdeas] = useState([]);

  const [captionHeight, setCaptionHeight] = useState(0);
  const [time, setTime] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleTimeStampClick = (timestamp: number) => () => {
    const startTimeInSeconds = Math.floor(timestamp);
    setTime(startTimeInSeconds);
  };

  const executeScroll = () => {
    if (ref && ref.current) ref.current.scrollIntoView();
  };

  return (
    <div className="h-full px-4 py-6 lg:px-8 space-y-7">
      <PageHeader title="Video title" description="Your summary of the video" />

      {/* Video player */}
      <div className="grid lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="block space-y-5">
            <div className="flex justify-between items-end">
              <div className="flex flex-col " ref={ref}>
                <h2 className="text-2xl font-semibold tracking-tight">
                  YouTube video
                </h2>
                <p className="text-sm text-muted-foreground">
                  The YouTube video you watched
                </p>
              </div>
              <DeleteButton id={params.id} />
            </div>
            <div className="object-contain">
              <YoutubePlayer
                videoId={videoId}
                autoPlay={true}
                title="My Video"
                setCaptionHeight={setCaptionHeight}
                time={time}
                playerKey={0}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:ml-5 self-end">
          {subtitles.length > 0 && (
            <TimeStampCard
              multiLingualTimeStamps={subtitles}
              height={captionHeight}
              onTimeStampClick={handleTimeStampClick}
            />
          )}
        </div>
      </div>

      {/* Step 3 */}
      <div className="grid lg:grid-cols-4 space-y-5">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your summary
          </h2>
          <p className="text-sm text-muted-foreground">
            Here is your summary of the video
          </p>
        </div>
        <div className="lg:col-span-2 space-y-2">
          <p>{summary}</p>
        </div>
      </div>

      {/* Step 4 */}
      <div className="grid lg:grid-cols-4 space-y-5">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            ChatGPT feedback
          </h2>
        </div>
        <div className="lg:col-span-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <ResponseCard
            title="Correct Ideas"
            description="Here are the ideas from the video that you got correct."
            ideas={correctIdeas}
            className="bg-green-500"
            onTimeStampClick={handleTimeStampClick}
            scrollFunction={executeScroll}
          />
          <ResponseCard
            title="Missing Ideas"
            description="Here are the ideas from the video that you missed."
            ideas={missingIdeas}
            className="bg-orange-500"
            onTimeStampClick={handleTimeStampClick}
            scrollFunction={executeScroll}
          />
          <ResponseCard
            title="Wrong Ideas"
            description="Here are the ideas from the video that you got wrong."
            ideas={wrongIdeas}
            className="bg-red-500"
            onTimeStampClick={handleTimeStampClick}
            scrollFunction={executeScroll}
          />
        </div>
      </div>
    </div>
  );
}
