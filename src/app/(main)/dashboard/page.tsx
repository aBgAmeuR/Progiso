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
      <ProjectHeader title="Dashboard" projectName={selectedProject.name}>
        <Button variant='secondary'>
          <div className="flex gap-2">
            Ajouter un membre
            <PlusCircleIcon className='size-5' />
          </div>
        </Button>
        <Button variant='primary'>
          <div className="flex gap-2">
            Paramètres
            <CogIcon className='size-5' />
          </div>
        </Button>
      </ProjectHeader>
      <Divider />
    </main>
  )
}
