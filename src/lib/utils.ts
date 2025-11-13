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
