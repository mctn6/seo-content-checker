"use client";
import Header from "@/components/Header";
import SnippetPreview from "@/components/SnippetPreview";
import TextEditor from "@/components/TextEditor";
import { Fragment, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [subKeywords, setSubKeywords] = useState<string[]>([""]);

  const [currentContent, setCurrentContent] = useState("## Hello world ##");
  return (
    <Fragment>
      <Header
        title={title}
        description={description}
        url={url}
        keyword={keyword}
        subKeywords={subKeywords}
      />
      <div className="grid grid-cols-2 divide-y gap-4">
        <TextEditor
          content={currentContent}
          setCurrentContent={setCurrentContent}
        />
        <SnippetPreview
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          url={url}
          setUrl={setUrl}
          keyword={keyword}
          setKeyword={setKeyword}
          subKeywords={subKeywords}
          setSubKeywords={setSubKeywords}
        />
      </div>
    </Fragment>
  );
}
