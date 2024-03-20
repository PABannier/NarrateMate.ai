/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ButtonSignin = ({
  text = "Start practicing",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/authentication");
  };

  return (
    <Link href="/authentication">
      <button className={cn("btn", extraStyle)} onClick={handleClick}>
        {text}
      </button>
    </Link>
  );
};

export default ButtonSignin;
