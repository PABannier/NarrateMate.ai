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
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs
                    defaultValue={Object.keys(discoverVideos)[0]}
                    className="h-full space-y-6"
                  >
                    <div className="space-between flex items-center">
                      <TabsList>
                        {Object.keys(discoverVideos).map((key, index) => (
                          <TabsTrigger
                            key={index}
                            value={key}
                            className="relative"
                          >
                            {languageCodes[key]}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
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
                                      <div className="flex space-x-4 pb-4">
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
                          {/* <div className="mt-6 space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Vlogs
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Your personal playlists. Updated daily.
                            </p>
                          </div>
                          <Separator className="my-4" />
                          <div className="relative">
                            <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {madeForYouAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                          </div> */}
                        </TabsContent>
                      )
                    )}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
