"use client";
import { Button } from "@/components/ui/button";
import { SeoResult, calculateSeoScore } from "@/lib/utils";
import { useCallback, useState } from "react";

export default function Header() {
  const [seoResult, setSeoResult] = useState<SeoResult>({ score: null, warnings: [], goodPoints: [], minorWarnings: [] });


  const handleRun = useCallback(() => {
    const previewElement = document.getElementById("preview");
    if (previewElement) {
      const htmlContent = previewElement.innerHTML; // Extract the HTML content as a string
      const result = calculateSeoScore(htmlContent);
      setSeoResult(result);
      console.log("result",result)
    }
  }, []);
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
      <h1 className="text-lg font-bold">SEO Content Checker</h1>
      <Button variant={"secondary"} onClick={handleRun}>
        Run
      </Button>
    </header>
  );
}
