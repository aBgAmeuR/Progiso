import { CreateProjectForm } from '@/features/projects/components';

export default async function CreateProjectPage() {
  return (
    <main className="w-full py-4">
      <div className="container">
        <CreateProjectForm />
      </div>
    </main>
  );
}
