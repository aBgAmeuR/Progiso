import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat('en-US', {
    month: opts.month ?? 'long',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    ...opts,
  }).format(new Date(date));
}

/**
 * Stole this from the @radix-ui/primitive
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

/**
 * Get the owner and repo name from a github url
 * @param url
 * @returns
 * @example
 * getDetailOfGithubRepoUrl('https://github.com/owner/repo') // { owner: 'owner', repo: 'repo' }
 */
export const getDetailOfGithubRepoUrl = (url: string) => {
  const [owner, repo] = url.replace('https://github.com/', '').split('/');
  return { owner, repo };
};
