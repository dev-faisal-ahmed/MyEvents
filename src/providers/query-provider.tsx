"use client";

import { type DefaultError, MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { errorToast } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";

export function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = makeQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left" />
      {children}
    </QueryClientProvider>
  );
}

const TIME = 10 * 60 * 1000;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: TIME } },
    queryCache: new QueryCache({ onError: onGlobalQueryError }),
    mutationCache: new MutationCache({ onError: onGlobalMutationError, onSuccess: onGlobalMutationSuccess }),
  });
};

const onGlobalQueryError = (error: DefaultError, query: unknown) => {
  if (error instanceof Error) {
    console.error("Global: Query failed:", "\nName:", error.name, "\nCause:", error.cause, "\nMessage:", error.message, "\nQuery:", query);
  } else {
    console.error("Global: Unknown query error", error);
  }
};

const onGlobalMutationError = (error: DefaultError, mutation: unknown) => {
  errorToast(error);

  if (error instanceof Error) {
    console.error(
      "Global: Mutation failed:",
      "\nName:",
      error.name,
      "\nCause:",
      error.cause,
      "\nMessage:",
      error.message,
      "\nMutation:",
      mutation,
    );
  } else {
    console.error("Global: Unknown mutation error", error);
  }
};

type ResponseWithMessage = { message?: string };
const onGlobalMutationSuccess = (data: unknown) => {
  const response = data as ResponseWithMessage;
  const message = typeof response?.message === "string" ? response.message : "Action completed successfully";

  toast.success(message);
};
