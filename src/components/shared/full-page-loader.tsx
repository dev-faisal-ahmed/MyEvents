import { Spinner } from "../ui/spinner";

type TFullPageLoaderProps = {
  message?: string;
};

export function FullPageLoader({ message }: TFullPageLoaderProps) {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-2">
      <Spinner />
      {message && <p className="text-muted-foreground">{message}</p>}
    </section>
  );
}
