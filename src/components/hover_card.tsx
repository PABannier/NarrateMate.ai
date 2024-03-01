import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export function TranslationHoverCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <div className="flex justify-between">
            <h4 className="text-sm font-semibold self-center">Translation</h4>
            <Button variant="ghost" size="icon">
              <PlusCircledIcon className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm">This is the token definition.</p>
          <div className="flex items-center pt-2"></div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
