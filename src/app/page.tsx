"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { YoutubePlayer } from "@/components/youtube_player";
import { useCallback, useState } from "react";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { ResponseCard } from "@/components/response_card";
import { Icons } from "@/components/icons";
import { toast } from "react-hot-toast";

export default function Home() {
  const [videoId, setVideoId] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [response, setResponse] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textArea, setTextArea] = useState("");

  const handlePlay = () => {
    const url = youtubeURL;
    const extractedId = extractYouTubeVideoId(url);
    if (extractedId) {
      setVideoId(extractedId);
    }

    // get video length to limit only to videos that are short
  };

  const handleSubmitSummary = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/submit_summary", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ videoId, summary: textArea }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setResponse(data);
    } catch (e) {
      toast.error((e as Error).message);
      setResponse(null);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="block">
        <div className="grid lg:grid-cols-5">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8 space-y-7">
              <div className="space-y-5">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Step 1
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter a YouTube URL
                  </p>
                </div>
                <div className="flex space-x-2 max-w-[640px]">
                  <Input
                    name="youtube-url"
                    onChange={(e) => setYoutubeURL(e.target.value)}
                  />
                  <Button variant="outline" type="submit" onClick={handlePlay}>
                    Play
                  </Button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Step 2
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Watch the YouTube Video
                  </p>
                </div>
                <div className="max-w-[640px] object-contain">
                  <YoutubePlayer
                    videoId={videoId}
                    autoPlay={true}
                    title="My Video"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Step 3
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Write a summary of the video
                  </p>
                </div>
                <div className="flex flex-col space-y-2 max-w-[640px]">
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
              </div>
              {response && !isLoading && (
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Step 4
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Response from ChatGPT
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[1500px]">
                    <ResponseCard
                      title="Correct Ideas"
                      description="Here are the ideas from the video that you got correct."
                      feedback={response.correctIdeas}
                      className="bg-green-500"
                    />
                    <ResponseCard
                      title="Missing Ideas"
                      description="Here are the ideas from the video that you missed."
                      feedback={response.missingIdeas}
                      className="bg-orange-500"
                    />
                    <ResponseCard
                      title="Wrong Ideas"
                      description="Here are the ideas from the video that you got wrong."
                      feedback={response.wrongIdeas}
                      className="bg-red-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
