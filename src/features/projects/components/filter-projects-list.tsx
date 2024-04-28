'use client';

import { useSession } from 'next-auth/react';
import { useQueryState } from 'nuqs';

import { TProject } from '../types';
import { ProjectCard } from './project-card';

import { cn } from '@/lib/utils';

type TFilterProjectsListProps = {
  projects: Array<TProject>;
};

const filterProjects = (projects: Array<TProject>, filter: string) => {
  return projects.filter((project) => {
    if (project.name.toLowerCase().includes(filter.toLowerCase())) return true;
    return false;
  });
};

export const FilterProjectsList = ({ projects }: TFilterProjectsListProps) => {
  const [filter] = useQueryState('q');
  const [view] = useQueryState('view');
  const { data, update } = useSession();

  const filteredProjects = filter ? filterProjects(projects, filter) : projects;

  const handleProjectClick = async (project: TProject) => {
    await update({
      user: {
        selectProject: {
          id: project.id,
          name: project.name,
          image_url: project.image_url || null,
        },
      },
    });
    console.log(data?.user);
  };

  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1',
        view === 'list' && 'flex flex-col gap-4'
      )}
    >
      {filteredProjects
        .sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1))
        .map((project) => (
          <button
            onClick={() => handleProjectClick(project)}
            className="cursor-pointer text-left"
            key={project.id}
          >
            <ProjectCard
              project={project}
              variant={view === 'list' ? 'list' : 'grid'}
            />
          </button>
        ))}
      <pre>{JSON.stringify(data?.user, null, 2)}</pre>
    </div>
  );
};
