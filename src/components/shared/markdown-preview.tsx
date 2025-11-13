import ReactMarkdown from "react-markdown";

type TMarkdownPreviewProps = {
  value: string;
};

export function MarkdownPreview({ value }: TMarkdownPreviewProps) {
  return (
    <div className="prose dark:prose-invert text-foreground max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => <h1 className="mt-4 mb-3 text-3xl font-bold" {...props} />,
          h2: ({ ...props }) => <h2 className="mt-4 mb-2 text-2xl font-bold" {...props} />,
          h3: ({ ...props }) => <h3 className="mt-4 mb-2 text-xl font-bold" {...props} />,
          p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          ul: ({ ...props }) => <ul className="mb-4 list-inside list-disc space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="mb-4 list-inside list-decimal space-y-2" {...props} />,
          li: ({ ...props }) => <li className="ml-4" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote className="border-primary text-muted-foreground my-4 border-l-4 pl-4 italic" {...props} />
          ),
          a: ({ ...props }) => <a className="text-primary hover:underline" {...props} />,
          hr: () => <hr className="border-border my-6" />,
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
