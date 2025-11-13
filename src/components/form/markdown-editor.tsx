"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MarkdownPreview } from "../shared/markdown-preview";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

type TMarkDownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  containerClassName?: string;
};

export function MarkdownEditor({ value, onChange }: TMarkDownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="rounded-md border">
      <header className="flex items-center border-b p-2">
        <Button type="button" variant="outline" onClick={() => setShowPreview((prev) => !prev)}>
          {showPreview ? "Show Editor" : "Show Preview"}
        </Button>
      </header>
      <ScrollArea className="">
        <div className="flex max-h-100">
          {showPreview ? (
            <div className="flex-1 border-l px-3 py-2">
              <MarkdownPreview value={value} />
            </div>
          ) : (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
