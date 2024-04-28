import { ProjectsList } from '@/features/projects/components';
import { SearchProjectInput } from '@/features/projects/components/search-project-input';

export default async function ProjectPage() {
  return (
    <main className="w-full py-4">
      <div className="container space-y-6">
        <SearchProjectInput />
        <ProjectsList />
      </div>
    </main>
  );
}
