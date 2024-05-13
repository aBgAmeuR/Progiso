import { PropsWithChildren } from 'react';
import Image from 'next/image';

import { Icons } from '@/components/icons';
import { getSelectedProject } from '@/features/projects';

export const ProjectSelector = async ({ children }: PropsWithChildren) => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  return (
    <>
      <Icons.slash className="mx-1 size-4" />
      <div className="flex items-center gap-2">
        <Image
          src={selectedProject.image_url}
          alt={selectedProject.name}
          width={24}
          height={24}
          className="rounded-full"
        />
        <p className="font-mono text-lg font-bold">{selectedProject.name}</p>
        {children}
      </div>
    </>
  );
};
