import { useEffect, useState } from 'react';

type MediaQuery =
  | '(max-width: 1024px)'
  | '(max-width: 768px)'
  | '(max-width: 640px)';

export const useMediaQuery = (query: MediaQuery) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};
