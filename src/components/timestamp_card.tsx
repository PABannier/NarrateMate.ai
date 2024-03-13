import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { MultiLingualTimeStamps } from "@/types";
import { TranslationHoverCard } from "./hover_card";
import { useState } from "react";
import { languageCodes } from "@/lib/youtube";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { removePunctuation } from "@/lib/utils";

interface SelectLanguageProps {
  languages: string[];
  onValueChange: (value: string) => void;
}

interface TimeStampCardProps {
  multiLingualTimeStamps: MultiLingualTimeStamps[];
  height: number;
  onTimeStampClick: (
    timestamp: number
  ) => React.MouseEventHandler<HTMLButtonElement>;
}

function TokenCard({ index, token }: { index: number; token: string }) {
  const [cardVisible, setCardVisible] = useState(false);

  const onClick = () => {
    setCardVisible(true);
  };

  const onMouseLeave = () => {
    setCardVisible(false);
  };

  return (
    <span key={index} onMouseLeave={onMouseLeave}>
      <Button
        variant="link"
        className="p-0 h-auto font-normal"
        onClick={onClick}
      >
        {token}
      </Button>{" "}
      {cardVisible && (
        <TranslationHoverCard
          word={removePunctuation(token)}
          open={cardVisible}
        />
      )}
    </span>
  );
}

function TokenSpan({ text }: { text: string }) {
  const tokens = text.split(" ");

  return (
    <div>
      {tokens.map((token, index) => {
        return <TokenCard key={index} index={index} token={token} />;
      })}
    </div>
  );
}

export function SelectLanguage({
  languages,
  onValueChange,
}: SelectLanguageProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue="en">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className="font-inter">
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languages.map((language, index) => {
            return (
              <SelectItem key={index} value={language}>
                {languageCodes[language as keyof typeof languageCodes]}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function TimeStampCard({
  multiLingualTimeStamps,
  height,
  onTimeStampClick,
}: TimeStampCardProps) {
  const languages = multiLingualTimeStamps.map((item) => item.languageCode);

  const initialSubtitleIndex = languages.includes("en")
    ? languages.indexOf("en")
    : 0;
  const [subtitleIndex, setSubtitleIndex] = useState(initialSubtitleIndex);

  const subtitles = multiLingualTimeStamps[subtitleIndex].subtitles;
  const onValueChange = (language: string) => {
    const index = languages.indexOf(language);
    setSubtitleIndex(index);
  };

  return (
    <ScrollArea className="rounded-md border" style={{ height }}>
      <div className="p-4">
        <div className="flex justify-between">
          <h4 className="mb-4 text-sm font-medium leading-none">Captions</h4>
          <SelectLanguage languages={languages} onValueChange={onValueChange} />
        </div>
        <div className="p-4">
          {subtitles.map((subtitle, index) => {
            return (
              <div key={index} className="text-sm flex gap-2 mb-1">
                <Button
                  variant="link"
                  className="items-start p-0 h-auto text-muted-foreground text-blue-500 font-robotoMono"
                  onClick={onTimeStampClick(Number(subtitle.start))}
                >
                  {subtitle.formattedStart}
                </Button>
                <TokenSpan text={subtitle.text} />
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
