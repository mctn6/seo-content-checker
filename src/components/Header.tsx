"use client";
import { Button } from "@/components/ui/button";
import { calculateSeoScore } from "@/lib/utils";
import { useCallback } from "react";

interface HeaderProps {
  title: string;
  description: string;
  url: string;
  keyword: string;
  subKeywords: string[];
  setSeoResult: Function;
}

export default function Header({
  title,
  description,
  url,
  keyword,
  subKeywords,
  setSeoResult
}: HeaderProps) {
  const handleRun = useCallback(() => {
    const previewElement = document.getElementById("preview");
    if (previewElement) {
      const htmlContent = previewElement.innerHTML; // Extract the HTML content as a string
      const result = calculateSeoScore(title,
        description,
        url,
        keyword,
        subKeywords,htmlContent);
      setSeoResult(result);
    }
  }, [description, keyword, setSeoResult, subKeywords, title, url]);
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
      <h1 className="text-lg font-bold">SEO Content Checker</h1>
      <Button variant={"secondary"} onClick={handleRun}>
        Run
      </Button>
    </header>
  );
}
