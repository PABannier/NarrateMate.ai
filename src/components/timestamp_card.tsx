import { ScrollArea } from "@/components/ui/scroll-area";

interface TimeStamp {
  text: string;
  start: string;
  dur: string;
}

interface TimeStampCardProps {
  timestamps: TimeStamp[];
  height: number;
}

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

export function TimeStampCard({ timestamps, height }: TimeStampCardProps) {
  return (
    <ScrollArea className="rounded-md border" style={{ height }}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Captions</h4>
        {timestamps.map((timestamp, index) => {
          const formattedTimestamp = parseTimeStamps(timestamp);
          return (
            <div key={index} className="text-sm">
              {formattedTimestamp.start} : {timestamp.text}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
