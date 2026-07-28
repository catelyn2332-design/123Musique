// Powered by OnSpace.AI
import { useContext } from 'react';
import { MusicContext } from '@/contexts/MusicContext';

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
