import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul {...props} className="list-inside list-disc" />,
        a: (props) => (
          <a {...props} className="text-green-500 underline" target="_blank" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
export default Markdown;
