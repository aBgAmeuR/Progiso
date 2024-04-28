import { PropsWithChildren } from 'react';

import { LateralNavbar } from '@/components/lateral-navbar/lateral-navbar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-1">
      <LateralNavbar />
      {children}
    </main>
  );
}
