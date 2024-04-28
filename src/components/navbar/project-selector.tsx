'use client';

import { PropsWithChildren } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Skeleton } from '../ui/skeleton';

import { Icons } from '@/components/icons';

const hidePaths = ['/', '/projects', '/projects/create'];

export const ProjectSelector = ({ children }: PropsWithChildren) => {
  const path = usePathname();
  const { data, status } = useSession();

  if (hidePaths.includes(path)) return null;
  if (status === 'loading') return <ProjectSelectorLoading />;
  if (!data?.user.selectProject) return null;

  const project = data.user.selectProject;

  return (
    <>
      <Icons.slash className="mx-1 size-4" />
      <div className="flex items-center gap-2">
        <Image
          src={project.image_url}
          alt={project.name}
          width={24}
          height={24}
          className="rounded-full"
        />
        <p className="font-mono text-lg font-bold">{project.name}</p>
        {children}
      </div>
    </>
  );
};

const ProjectSelectorLoading = () => {
  return (
    <>
      <Icons.slash className="mx-1 size-4" />
      <div className="flex items-center gap-2">
        <Skeleton className="size-6 rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-5 w-[20px]" />
        </div>
      </div>
    </>
  );
};
