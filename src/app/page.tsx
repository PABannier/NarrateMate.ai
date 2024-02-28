"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { YoutubePlayer } from "@/components/youtube_player";
import { ReactEventHandler, useState } from "react";
import { extractYouTubeVideoId } from "@/lib/youtube";
export default function Home() {
  const [videoId, setVideoId] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const handlePlay = () => {
    const url = youtubeURL;
    const extractedId = extractYouTubeVideoId(url);
    if (extractedId) {
      setVideoId(extractedId);
    }
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
                    Enter a youtube URL
                  </p>
                </div>
                <div className="flex space-x-2 max-w-[500px]">
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
                <div className="flex flex-col space-y-2 max-w-[500px]">
                  <YoutubePlayer videoId={videoId} />
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
                <div className="flex flex-col space-y-2 max-w-[500px]">
                  <Textarea name="summary" className="min-h-[200px]" />
                  <div className="flex justify-end">
                    <Button variant="outline" type="button">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
