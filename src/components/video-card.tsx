import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimestamp } from "@/lib/utils";

interface VideoCardProps {
  title: string;
  createdAt: string;
  thumbnailUrl: string;
}

export const VideoCard = ({
  title,
  createdAt,
  thumbnailUrl,
}: VideoCardProps) => {
  return (
    <Card className="border-none p-2 shadow-none hover:cursor-pointer hover:bg-secondary rounded-none">
      <CardContent className="p-0">
        <img src={thumbnailUrl} alt={title} />
      </CardContent>
      <CardHeader className="px-0 py-0 mt-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{formatTimestamp(createdAt)}</CardDescription>
      </CardHeader>
    </Card>
  );
};
