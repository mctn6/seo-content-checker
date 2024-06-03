"use client";

import { SeoResult } from "@/lib/utils";

interface SEODisplayProps {
  seoResult: SeoResult;
}

export default function SEODisplay({ seoResult }: SEODisplayProps) {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">SEO Results</h2>

      <div className="mb-4">
        <h3 className="text-md font-bold text-green-600">Good Points</h3>
        <ul className="list-disc pl-5">
          {seoResult.goodPoints.map((point, index) => (
            <li key={index} className="text-green-700">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold text-yellow-600">Minor Warnings</h3>
        {seoResult.minorWarnings.length > 0 ? (
          <ul className="list-disc pl-5">
            {seoResult.minorWarnings.map((warning, index) => (
              <li key={index} className="text-yellow-700">
                {warning}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-700">No minor warnings.</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold text-red-600">Warnings</h3>
        <ul className="list-disc pl-5">
          {seoResult.warnings.map((warning, index) => (
            <li key={index} className="text-red-700">
              {warning}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold text-blue-600">SEO Score</h3>
        <p className="text-blue-700">{seoResult.score}</p>
      </div>
    </div>
  );
}
