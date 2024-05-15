import { ProjectCardSkeleton } from './project-card-skeleton';

import { cn } from '@/lib/utils';

type TProjectsListSkeletonProps = {
  view?: string;
};

export const ProjectsListSkeleton = ({ view }: TProjectsListSkeletonProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1',
        view === 'list' && 'flex flex-col gap-4'
      )}
    >
      <ProjectCardSkeleton variant={view === 'list' ? 'list' : 'grid'} />
      <ProjectCardSkeleton variant={view === 'list' ? 'list' : 'grid'} />
      <ProjectCardSkeleton variant={view === 'list' ? 'list' : 'grid'} />
      <ProjectCardSkeleton variant={view === 'list' ? 'list' : 'grid'} />
    </div>
  );
};
