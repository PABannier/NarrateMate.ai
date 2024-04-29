import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { VideoThumbnail } from "@/components/video-thumbnail";
import { discoverVideos } from "./data";

import { languageCodes } from "@/lib/youtube";
export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function MusicPage() {
  return (
    <>
      <div className="">
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs
                  defaultValue={Object.keys(discoverVideos)[0]}
                  className="h-full space-y-6"
                >
                  {/* <div className="flex flex-wrap"> */}
                  <TabsList>
                    {Object.keys(discoverVideos).map((key, index) => (
                      <TabsTrigger key={index} value={key} className="relative">
                        {languageCodes[key]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {/* </div> */}
                  {Object.entries(discoverVideos).map(
                    ([languageCode, videoCategories], index) => (
                      <TabsContent
                        key={index}
                        value={languageCode}
                        className="border-none p-0 outline-none"
                      >
                        <div className="space-y-6">
                          {Object.entries(videoCategories).map(
                            ([category, videos], index) => (
                              <div key={index}>
                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                      {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                      Top picks for you. Updated daily.
                                    </p>
                                  </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="relative h-[200px]">
                                  <ScrollArea>
                                    <div className="flex space-x-4 pb-4 ">
                                      {videoCategories[category].map(
                                        (video, index) => (
                                          <VideoThumbnail
                                            key={index}
                                            discoverVideo={video}
                                            className="w-[250px]"
                                            aspectRatio="video"
                                            width={330}
                                            height={250}
                                          />
                                        )
                                      )}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                  </ScrollArea>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
