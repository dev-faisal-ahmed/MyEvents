import { Spinner } from "../ui/spinner";

type TFullPageLoaderProps = {
  message?: string;
};

export function FullPageLoader({ message }: TFullPageLoaderProps) {
  return (
    <section className="flex h-[calc(100vh-90px)] w-full flex-col items-center justify-center gap-4">
      <Spinner className="size-8" />
      {message && <p className="text-muted-foreground font-title font-semibold">{message}</p>}
    </section>
  );
}
