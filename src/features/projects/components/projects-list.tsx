import Link from 'next/link';

import { getProjects } from '../services';
import { FilterProjectsList } from './filter-projects-list';

import { Button } from '@/components/ui/button';

export const ProjectsList = async () => {
  const project = await getProjects();

  if (!project) return null;

  if (project.length <= 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed py-8 shadow-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No projects found
          </h3>
          <p className="text-muted-foreground text-sm">
            Create a new project to get started
          </p>
          <Link href="/projects/new">
            <Button>Create Project</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <FilterProjectsList projects={project} />;
};
