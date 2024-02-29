import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { FormattedTimeStamp } from "@/types";

interface TimeStampCardProps {
  timestamps: FormattedTimeStamp[];
  height: number;
  onTimeStampClick: (
    timestamp: number
  ) => React.MouseEventHandler<HTMLButtonElement>;
}

export function TimeStampCard({
  timestamps,
  height,
  onTimeStampClick,
}: TimeStampCardProps) {
  return (
    <ScrollArea className="rounded-md border" style={{ height }}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Captions</h4>
        {timestamps.map((timestamp, index) => {
          return (
            <div key={index} className="text-sm flex gap-2 mb-1">
              <Button
                variant="link"
                className={`items-start p-0 h-auto text-muted-foreground text-blue-500 font-robotoMono`}
                onClick={onTimeStampClick(Number(timestamp.start))}
              >
                {timestamp.formattedStart}
              </Button>
              {timestamp.text}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
