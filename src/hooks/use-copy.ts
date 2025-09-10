'use client';

import { useState, useCallback } from 'react';

type CopyState = 'idle' | 'copied' | 'error';

export function useCopy() {
  const [state, setState] = useState<CopyState>('idle');

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');

      // Reset state after 2 seconds
      setTimeout(() => {
        setState('idle');
      }, 2000);
    } catch {
      setState('error');

      // Reset error state after 2 seconds
      setTimeout(() => {
        setState('idle');
      }, 2000);
    }
  }, []);

  return {
    copy,
    state,
    isCopied: state === 'copied',
    isError: state === 'error',
    isIdle: state === 'idle',
  };
}
