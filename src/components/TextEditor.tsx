import { useState, useEffect, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { Textarea } from "./ui/textarea";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TextEditorProps {
  content: string;
  setCurrentContent: Function;
}

export default function TextEditor(props: TextEditorProps) {
  const { content, setCurrentContent } = props;
  const [previewText, setPreviewText] = useState(content);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setPreviewText(content);
    setCurrentContent(content);
    const textArea = document.getElementById(
      "markdown-text-editor"
    ) as HTMLTextAreaElement;

    if (textArea) {
      textArea.value = content;
    }
  }, [content, setCurrentContent]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;

    setCurrentContent(inputText);
    setPreviewText(inputText);
  };

  const handleTabKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const updatedText =
        previewText.substring(0, start) + "\t" + previewText.substring(end);

      // Update the textarea value directly
      textarea.value = updatedText;

      // Move the cursor position after the inserted tab character
      textarea.selectionStart = textarea.selectionEnd = start + 1;

      // Trigger the handleChange event manually to update the state
      handleChange({
        target: textarea,
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };
  return (
    <Fragment>
      <div className="">
        <div className="flex justify-between p-4">
          <b>{isPreview ? "Preview" : "Markdown"}</b>
          <button onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? <EyeOffIcon size={24} /> : <EyeIcon size={24} />}
          </button>
        </div>
        <div className="px-4 h-full">
          <div className=" h-full flex-1">
            <div className={` ${isPreview ? "hidden" : "block"} h-[480px] lg:h-screen`}>
              <Textarea
                id="markdown-text-editor"
                onChange={handleChange}
                onKeyDown={handleTabKeyPress}
                value={previewText}
                className="w-full h-full resize-none text-gray-900"
                placeholder="Enter your text here..."
              />
            </div>
            <div
              id="preview"
              className={`${isPreview ? "block" : "hidden"} prose`}
            >
              <ReactMarkdown>{previewText}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
