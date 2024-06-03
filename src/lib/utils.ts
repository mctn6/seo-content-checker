import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SeoResult {
  score: number | null;
  warnings: string[];
  goodPoints: string[];
  minorWarnings: string[];
}

export function calculateSeoScore(htmlContent: string): SeoResult {
  let score = 100;
  let warnings: string[] = [];
  let goodPoints: string[] = [];
  let minorWarnings: string[] = [];

  const keywords = ["progressive"];
  const subKeywords = ["car insurance", "rates", "premiums", "save money", "us"];


  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // Check for title length
  const titleElement = doc.querySelector('title');
  const title = titleElement ? titleElement.innerText : '';
  if (title.length < 30 || title.length > 60) {
    score -= 10;
    warnings.push('Title length should be between 30 and 60 characters.');
  } else {
    goodPoints.push(`Title tag is ${title.length} characters long.`);
  }

  // Check for meta description length
  const metaDescriptionElement = doc.querySelector('meta[name="description"]');
  const metaDescription = metaDescriptionElement ? (metaDescriptionElement as HTMLMetaElement).content : '';
  if (metaDescription.length < 70 || metaDescription.length > 160) {
    score -= 10;
    warnings.push(`Meta description length should be between 70 and 160 characters. It is ${metaDescription.length} characters long.`);
  } else {
    goodPoints.push(`Meta description is ${metaDescription.length} characters long.`);
  }

 // Check for headers presence and structure
 const headers = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
 const h1Tags = headers.filter(header => header.tagName.toLowerCase() === 'h1');
 if (h1Tags.length !== 1) {
   score -= 10;
   warnings.push(`There should be exactly one h1 tag. Found ${h1Tags.length}.`);
 } else {
   goodPoints.push(`Exactly one h1 tag found.`);
 }

 // Check header structure
 let lastHeaderLevel = 0;
 headers.forEach(header => {
   const headerLevel = parseInt(header.tagName.charAt(1));
   if (lastHeaderLevel && headerLevel > lastHeaderLevel + 1) {
     score -= 5;
     warnings.push(`Improper header structure: <${header.tagName.toLowerCase()}> should not follow <h${lastHeaderLevel}>.`);
   }
   lastHeaderLevel = headerLevel;
 });


  const bodyElement = doc.querySelector('body');
  const bodyText = bodyElement ? bodyElement.innerText : '';
  const wordCount = bodyText.split(/\s+/).length;

  // Check for keyword density
  let keywordCount = 0;
  keywords.forEach(keyword => {
    keywordCount += (bodyText.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []).length;
  });
  const keywordDensity = (keywordCount / wordCount) * 100;

  if (keywordDensity < 0.5 || keywordDensity > 2.5) {
    score -= 10;
    warnings.push(`Keyword density should be between 0.5% and 2.5%. It is ${keywordDensity.toFixed(2)}%.`);
  } else {
    goodPoints.push(`Keyword density is ${keywordDensity.toFixed(2)}%.`);
  }

  // Check for word count
  if (wordCount < 300) {
    score -= 10;
    warnings.push(`Content body should have at least 300 words. It has ${wordCount} words.`);
  } else {
    goodPoints.push(`Content body has ${wordCount} words.`);
  }

  // Check for sub keywords
  let subKeywordWarnings: string[] = [];
  let subKeywordGoodPoints: string[] = [];
  let subKeywordDensity: string[] = [];

  subKeywords.forEach(subKeyword => {
    const subKeywordCount = (bodyText.match(new RegExp(`\\b${subKeyword}\\b`, 'gi')) || []).length;
    const subKeywordDensityValue = (subKeywordCount / wordCount) * 100;

    if (subKeywordDensityValue > 2.5) {
      subKeywordWarnings.push(`The density of sub keyword "${subKeyword}" is too high in the content, i.e. ${subKeywordDensityValue.toFixed(2)}%.`);
    } else if (subKeywordDensityValue > 0) {
      subKeywordGoodPoints.push(`The density of sub keyword "${subKeyword}" is ${subKeywordDensityValue.toFixed(2)}% in the content, which is good.`);
    }

    subKeywordDensity.push(`(${subKeyword} ${subKeywordDensityValue.toFixed(2)}%)`);
  });

  warnings.push(...subKeywordWarnings);
  goodPoints.push(...subKeywordGoodPoints);

  // Links check
  const internalLinks = Array.from(doc.querySelectorAll('a[href^="/"]'));
  const externalLinks = Array.from(doc.querySelectorAll('a[href^="http"]'));
  if (internalLinks.length < 3) {
    warnings.push(`Not enough internal links. You only have ${internalLinks.length}, try increasing it.`);
  }
  if (externalLinks.length < 2) {
    warnings.push(`Not enough outbound links. You only have ${externalLinks.length}, try increasing it.`);
  }

  // Meta description keyword check
  const metaDescriptionKeywords = keywords.filter(keyword => metaDescription.includes(keyword));
  if (metaDescriptionKeywords.length === 0) {
    minorWarnings.push('Meta description does not contain any keywords.');
  }

  // Keyword checks in headers
  keywords.forEach(keyword => {
    headers.forEach(header => {
      const headerText = (header as HTMLElement).innerText;
      if (!headerText.includes(keyword)) {
        minorWarnings.push(`Keyword "${keyword}" not found in ${header.tagName} tag "${headerText}".`);
      } else {
        goodPoints.push(`Keyword "${keyword}" found in ${header.tagName} tag "${headerText}".`);
      }
    });
  });

  // Sub keyword checks in headers
  subKeywords.forEach(subKeyword => {
    headers.forEach(header => {
      const headerText = (header as HTMLElement).innerText;
      if (!headerText.includes(subKeyword)) {
        minorWarnings.push(`Sub keyword "${subKeyword}" not found in ${header.tagName} tag "${headerText}".`);
      } else {
        goodPoints.push(`Sub keyword "${subKeyword}" found in ${header.tagName} tag "${headerText}".`);
      }
    });
  });

  return { score, warnings, goodPoints, minorWarnings };
}