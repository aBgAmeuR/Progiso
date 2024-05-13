import { Suspense } from 'react';
import Link from 'next/link';

import { Icons } from '../icons';
import { ProjectSelector } from './project-selector';
import { ProjectSelectorDropdownMenu } from './project-selector-dropdown-menu';
import { ProjectSelectorSkeleton } from './project-selector-skeleton';
import { ShowProjectSelector } from './show-project-selector';

import { SignInButton } from '@/components/navbar/sign-in-button';
import { ThemeToggle } from '@/components/navbar/theme-toggle';
import { UserDropdown } from '@/components/navbar/user-dropdown';
import { getServerSession } from '@/lib/auth';

export const Navbar = async () => {
  const session = await getServerSession();

  return (
    <header className="bg-muted/40 w-full border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="size-6" />
            <p className="font-mono text-lg font-bold">Progiso</p>
          </Link>
          <Suspense fallback={<ProjectSelectorSkeleton />}>
            <ShowProjectSelector>
              <ProjectSelector>
                <ProjectSelectorDropdownMenu />
              </ProjectSelector>
            </ShowProjectSelector>
          </Suspense>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session ? <UserDropdown session={session} /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
};
