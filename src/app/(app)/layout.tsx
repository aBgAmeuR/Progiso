import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { LateralNavbar } from '@/components/lateral-navbar/lateral-navbar';
import { getServerSession } from '@/lib/auth';

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession();
  if (!session) return redirect('/');
  if (!session.user.selectProject) return redirect('/projects');

  return (
    <main className="flex flex-1">
      <LateralNavbar />
      {children}
    </main>
  );
}
