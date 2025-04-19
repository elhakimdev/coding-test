import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type PromptInput = {
  prompt: string;
};

export function useAiStream() {
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ prompt }: PromptInput) => {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.body) throw new Error('No response stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      setIsStreaming(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        for (const char of chunk) {
          fullText += char;
          setOutput(prev => prev + char); // Typing effect
          await new Promise(r => setTimeout(r, 10)); // Adjust speed here
        }
      }

      setIsStreaming(false);
      return fullText;
    },
  });

  return {
    ...mutation,
    output,
    isStreaming,
    setOutput,
  };
}
