"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { addWord } from "@/lib/database/mutations";
import { WordEntry } from "@/types";
import toast from "react-hot-toast";
import { Icons } from "./icons";
import { useStore } from "@/app/zustand";

interface TranslationHoverCardProps {
  open: boolean;
  word: string;
}

export function TranslationHoverCard({
  open,
  word,
}: TranslationHoverCardProps) {
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdded, setIsLoadingAdded] = useState(false);
  const selectedWords = useStore((state) => state.selectedWords);
  const addSelectedWord = useStore((state) => state.addSelectedWord);

  const summaryId = useStore((state) => state.currentSummaryId);

  useEffect(() => {
    setIsLoading(true);

    fetch(`/api/translate?word=${word}`, {
      method: "GET",
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setTranslation(data.translation);
        setDefinition(data.definition);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [word]);

  const handleAddWord = async ({
    word,
    translation,
    definition,
    summaryId,
  }: WordEntry) => {
    setIsLoadingAdded(true);
    const response = await addWord({
      word,
      translation,
      definition,
      summaryId,
    });
    const { error } = JSON.parse(response);
    setIsLoadingAdded(false);
    if (error) {
      toast.error((error as Error).message);
      return;
    }
    addSelectedWord(word, translation, definition);
    toast.success("Word added successfully");
    return;
  };
  return (
    <HoverCard open={open}>
      <HoverCardTrigger />
      <HoverCardContent className="w-80 flex justify-center">
        {isLoading ? (
          <Icons.spinner className="h-4 w-4 animate-spin ml-2" />
        ) : (
          <div className="space-y-1">
            <div className="flex justify-between">
              <h4 className="text-sm font-semibold self-center">
                {translation}
              </h4>

              {isLoadingAdded ? (
                <Button variant="ghost" size="icon" disabled={isLoadingAdded}>
                  <Icons.spinner className="h-4 w-4 animate-spin ml-2" />{" "}
                </Button>
              ) : selectedWords.has(word) ? (
                <CheckCircledIcon className="h-5 w-5" color="green" />
              ) : (
                <Button variant="ghost" size="icon" disabled={isLoadingAdded}>
                  <PlusCircledIcon
                    className="h-5 w-5"
                    onClick={() =>
                      handleAddWord({
                        word,
                        translation,
                        definition,
                        summaryId,
                      })
                    }
                  />
                </Button>
              )}
            </div>
            <p className="text-sm">{definition}</p>
            <div className="flex items-center pt-2"></div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
