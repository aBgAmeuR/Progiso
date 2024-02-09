import { ProjectHeader } from "@/components/global/project-header";
import { getSelectedProject } from "@/lib/project";
import { CogIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Divider } from '@tremor/react';
import { redirect } from "next/navigation";

export default async function Page() {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) redirect('/projects');

  return (
    <main className="px-8 py-6">
      <ProjectHeader title="Tâches" projectName={selectedProject.name}>
        <Button variant='primary'>
          <div className="flex gap-2">
            Ajouter une tâche
            <PlusCircleIcon className='size-5' />
          </div>
        </Button>
      </ProjectHeader>
    </main>
  )
}
