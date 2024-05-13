'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

const hidePaths = ['/', '/projects', '/projects/new'];

export const ShowProjectSelector = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();

  if (hidePaths.includes(pathName)) return null;

  return children;
};
