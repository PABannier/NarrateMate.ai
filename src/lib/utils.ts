import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removePunctuation(s: string) {
  const punctuationless = s.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, "");
  return punctuationless.replace(/\s{2,}/g, " ");
}

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
type AnyObject = {
  [key: string]: any;
};

function toCamelCase(str: string): string {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

export function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamelCase(v));
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce<AnyObject>((result, key) => {
      result[toCamelCase(key)] = convertKeysToCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}
export const getURL = () => {
  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://narratemate.vercel.app/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};
