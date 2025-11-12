import { clsx, type ClassValue } from "clsx";
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
