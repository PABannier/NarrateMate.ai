import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PlusCircledIcon } from "@radix-ui/react-icons";

interface TranslationHoverCardProps {
  children: React.ReactNode;
  word: string;
}

export function TranslationHoverCard({
  children,
  word,
}: TranslationHoverCardProps) {
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTranslation(data.translation);
        setDefinition(data.definition);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [word]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <div className="flex justify-between">
            <h4 className="text-sm font-semibold self-center">{translation}</h4>
            <Button variant="ghost" size="icon">
              <PlusCircledIcon className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm">{definition}</p>
          <div className="flex items-center pt-2"></div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
