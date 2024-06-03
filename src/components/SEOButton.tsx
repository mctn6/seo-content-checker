import { calculateSeoScore } from "@/lib/utils";
import { useCallback } from "react";
import { Button } from "./ui/button";

interface SEOButtonProps {
  title: string;
  description: string;
  url: string;
  keyword: string;
  subKeywords: string[];
  setSeoResult: Function;
}

export default function SEOButton({
  title,
  description,
  url,
  keyword,
  subKeywords,
  setSeoResult,
}: SEOButtonProps) {
  const handleRun = useCallback(() => {
    const previewElement = document.getElementById("preview");
    if (previewElement) {
      const htmlContent = previewElement.innerHTML; // Extract the HTML content as a string
      const result = calculateSeoScore(
        title,
        description,
        url,
        keyword,
        subKeywords,
        htmlContent
      );
      setSeoResult(result);
    }
  }, [description, keyword, setSeoResult, subKeywords, title, url]);

  return (
    <Button className="w-full lg:w-fit" onClick={handleRun}>
      Run
    </Button>
  );
}
