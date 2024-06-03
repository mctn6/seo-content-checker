"use client";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { TrashIcon } from "lucide-react";

interface SnippetPreviewProps {
  title: string;
  setTitle: Function;
  description: string;
  setDescription: Function;
  url: string;
  setUrl: Function;
  keywords: string;
  setKeywords: Function;
  subKeywords: string[];
  setSubKeywords: Function;
}

export default function SnippetPreview({
  title,
  setTitle,
  description,
  setDescription,
  url,
  setUrl,
  keywords,
  setKeywords,
  subKeywords,
  setSubKeywords,
}: SnippetPreviewProps) {

  const handleSubKeywordsChange = (index: number, value: string) => {
    const updatedSubKeywords = [...subKeywords];
    updatedSubKeywords[index] = value;
    setSubKeywords(updatedSubKeywords);
  };

  const addSubKeyword = () => {
    setSubKeywords([...subKeywords, ""]);
  };

  const removeSubKeyword = (index: number) => {
    const updatedSubKeywords = [...subKeywords];
    updatedSubKeywords.splice(index, 1);
    setSubKeywords(updatedSubKeywords);
  };

  return (
    <div className="p-4 ">
      <h2 className="text-lg font-bold mb-4">Google Snippet Preview</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL e.g https://sample.com/lorem-ipsum"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Keywords
        </label>
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sub Keywords
        </label>
        {subKeywords.map((subKeyword, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              value={subKeyword}
              onChange={(e) => handleSubKeywordsChange(index, e.target.value)}
              placeholder="Enter sub keyword"
            />
            <Button variant="ghost" onClick={() => removeSubKeyword(index)}>
                <TrashIcon size={16}>Remove</TrashIcon>
              
            </Button>
          </div>
        ))}
        <Button onClick={addSubKeyword} className="mt-2">Add Sub Keyword</Button>
      </div>

      {/* Preview Section */}
      <div className="mt-6">
        <h3 className="text-md font-bold text-gray-800">Preview:</h3>
        <div className="mt-2 p-4 border rounded-md bg-gray-50">
          <a href={url} className="text-blue-700 text-xl font-medium">
            {title}
          </a>
          <p className="text-green-600">{url}</p>
          <p className="text-gray-800">{description}</p>
        </div>
      </div>
    </div>
  );
}
