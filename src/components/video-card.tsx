import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface VideoCardProps {
  title: string;
  createdAt: string;
  thumbnailUrl: string;
  // onClick: () => void;
}

export const VideoCard = ({
  title,
  createdAt,
  thumbnailUrl,
}: // onClick,
VideoCardProps) => {
  return (
    <Card className="border-none p-2 shadow-none hover:cursor-pointer hover:bg-secondary rounded-none">
      <CardContent className="p-0 flex flex-col">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full self-end hover:border-solid hover:border"
          // onClick={onClick}
        >
          <Cross2Icon />
        </Button>
        <Image
          className=""
          src={thumbnailUrl}
          alt={title}
          width={480}
          height={360}
        />
      </CardContent>
      <CardHeader className="px-0 py-0 mt-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{formatTimestamp(createdAt)}</CardDescription>
      </CardHeader>
    </Card>
  );
};
