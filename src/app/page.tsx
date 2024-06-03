"use client";
import Header from "@/components/Header";
import SEODisplay from "@/components/SEODisplay";
import SnippetPreview from "@/components/SnippetPreview";
import TextEditor from "@/components/TextEditor";
import { SeoResult } from "@/lib/utils";
import { Fragment, useState } from "react";

export default function Home() {
  const [seoResult, setSeoResult] = useState<SeoResult>({
    score: null,
    warnings: [],
    goodPoints: [],
    minorWarnings: [],
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [subKeywords, setSubKeywords] = useState<string[]>([""]);
  const [currentContent, setCurrentContent] = useState("");

  return (
    <Fragment>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-y gap-4">
        <TextEditor
          content={currentContent}
          setCurrentContent={setCurrentContent}
        />
        <div>
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
            setSeoResult={setSeoResult}
          />
          {seoResult.score !== null && <SEODisplay seoResult={seoResult} />}
        </div>
      </div>
    </Fragment>
  );
}
