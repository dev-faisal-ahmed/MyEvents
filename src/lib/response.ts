export const Response = {
  success<TData = unknown>(message: string, data: TData) {
    return { ok: true, message, data };
  },
};
