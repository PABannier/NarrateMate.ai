import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removePunctuation(s: string) {
  const punctuationless = s.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, "");
  return punctuationless.replace(/\s{2,}/g, " ");
}
