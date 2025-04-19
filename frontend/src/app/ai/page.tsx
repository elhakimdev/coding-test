'use client';
import { useAiStream } from '@/hooks/use-ai-stream';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function Ai() {
  const [prompt, setPrompt] = useState('');
  const { mutate, output, isPending, isStreaming, setOutput } = useAiStream();

  const handleSubmit = () => {
    setOutput('');
    mutate({ prompt });
  };

  const handleClear = () => {
    setOutput("");
    setPrompt("")
  }

  return (
    <div className="p-6 font-mono max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gemini-Like AI Chat</h1>
      <textarea
        rows={3}
        className="w-full p-2 border rounded mb-4"
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Ask'}
      </button>
      <button
        onClick={handleClear}
        className="bg-green-500 text-white px-4 py-2 rounded ml-3"
        disabled={isPending}
      >
        Clear
      </button>

      <div className="mt-6 whitespace-pre-wrap text-gray-800 border-t pt-4">
        <div
          className="markdown-content"
          style={{ overflowY: 'auto', padding: '10px', maxHeight: '400px' }}
        >
          <ReactMarkdown
            children={output}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </div>
      </div>
    </div>
  );
}
