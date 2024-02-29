import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";

interface TimeStamp {
  text: string;
  start: string;
  dur: string;
}

interface TimeStampCardProps {
  timestamps: TimeStamp[];
  height: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export function TimeStampCard({
  timestamps,
  height,
  setTime,
}: TimeStampCardProps) {
  function parseTimeStamps(timestamp: TimeStamp) {
    const start = Number(timestamp.start);
    const duration = Number(timestamp.dur);
    const end = start + duration;
    const formatTime = (time: number) => {
      return time < 10 ? `0${time}` : `${time}`;
    };

    return {
      start: `${formatTime(Math.floor(start / 60))}:${formatTime(
        Math.floor(start % 60)
      )}`,
      end: `${formatTime(Math.floor(end / 60))}:${formatTime(
        Math.floor(end % 60)
      )}`,
    };
  }

  const handleTimeStampClick = (timestamp: number) => () => {
    const startTimeInSeconds = Math.floor(timestamp);
    setTime(startTimeInSeconds);
  };

  return (
    <ScrollArea className="rounded-md border" style={{ height }}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Captions</h4>
        {timestamps.map((timestamp, index) => {
          const formattedTimestamp = parseTimeStamps(timestamp);
          return (
            <div key={index} className="text-sm">
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={handleTimeStampClick(Number(timestamp.start))}
              >
                {formattedTimestamp.start}
              </Button>{" "}
              : {timestamp.text}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
