import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

type TError = [Error, null];
type TSuccess<T> = [null, T];

export const safePromise = async <T>(promise: Promise<T>): Promise<TSuccess<T> | TError> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error as Error, null];
  }
};

// Error Handling
export const errorMessageGen = (error: unknown, defaultMessage: string = "Something went wrong") => {
  let message = defaultMessage;
  if (error instanceof Error) message = error.message;
  return message;
};

export const errorToast = (error: unknown) => {
  toast.error(errorMessageGen(error) || "Something Went wrong");
};

export const removeWhiteSpace = (str: string) => str.replace(/\s/g, "_");

export const stripMarkdown = (markdown: string): string => {
  if (!markdown) return "";

  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "") // remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // remove links but keep text
    .replace(/(`{1,3})(.*?)\1/g, "$2") // remove inline/code fences
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // italics
    .replace(/^#+\s+(.*)/gm, "$1") // headings
    .replace(/>\s?(.*)/g, "$1") // blockquotes
    .replace(/[-*+]\s+(.*)/g, "$1") // list items
    .replace(/\n{2,}/g, " ") // collapse newlines
    .trim();
};
