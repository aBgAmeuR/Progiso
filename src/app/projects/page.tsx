import { Suspense } from 'react';

import { ProjectsList } from '@/features/projects/components';
import { ProjectsListSkeleton } from '@/features/projects/components/projects-list-skeleton';
import { SearchProjectInput } from '@/features/projects/components/search-project-input';

type TProjectPageProps = {
  searchParams: { view?: string };
};

export default async function ProjectPage({ searchParams }: TProjectPageProps) {
  return (
    <main className="w-full py-4">
      <div className="container space-y-6">
        <SearchProjectInput />
        <Suspense fallback={<ProjectsListSkeleton view={searchParams.view} />}>
          <ProjectsList />
        </Suspense>
      </div>
    </main>
  );
}
