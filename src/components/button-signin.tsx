/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ButtonSignin = ({
  text = "Start practicing",
  href = "/authentication",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
  href?: string;
}) => {
  return (
    <Link href={href}>
      <button className={cn("btn btn-secondary ", extraStyle)}>{text}</button>
    </Link>
  );
};

export default ButtonSignin;
