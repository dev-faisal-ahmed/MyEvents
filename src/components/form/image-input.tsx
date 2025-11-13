import { useRef, useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageInputProps = {
  value: string | File | null;
  onChange: (value: File | string | null) => void;
  label?: string;
  className?: string;
};

export function ImageInput({ value, onChange, className }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <div
        className={cn(
          "hover:border-primary relative flex h-60 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed transition hover:bg-blue-50/30 dark:bg-gray-950/10",
          className,
        )}
        onClick={() => !preview && inputRef.current?.click()}
      >
        {preview ? (
          <div className="relative h-full w-full">
            {/* Blurred background */}
            <div
              className="absolute inset-0 scale-110 blur-xl brightness-75"
              style={{
                backgroundImage: `url(${preview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Main image */}
            <img src={preview} alt="Selected" className="absolute inset-0 z-10 m-auto max-h-full max-w-full object-contain" />
            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 z-20 rounded-full bg-black/60 p-1 text-white transition hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center justify-center">
            <UploadCloud className="text-muted-foreground mb-2 size-12" />
            <span className="text-sm font-medium">Add Image</span>
            <span className="text-muted-foreground mt-1 text-xs">PNG, JPG up to 5MB</span>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleSelectImage} className="hidden" />
    </>
  );
}
