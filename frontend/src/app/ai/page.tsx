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
      <div className='flex flex-row gap-x-3'>
      <button
        onClick={handleSubmit}
        className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Ask'}
      </button>
      <button
        onClick={handleClear}
        className="cursor-pointer rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        disabled={isPending}
      >
        Clear
      </button>
      </div>

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
