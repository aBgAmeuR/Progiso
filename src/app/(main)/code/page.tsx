import { ProjectHeader } from "@/components/global/project-header";
import { getSelectedProject } from "@/lib/project";
import { RiGithubFill } from '@remixicon/react';
import { Button } from '@tremor/react';
import { redirect } from "next/navigation";
import { LinkGithubProject } from "./_components/link-github-project";

export default async function Page() {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) redirect('/projects');

  return (
    <main className="px-8 py-6">
      <ProjectHeader title="Code" projectName={selectedProject.name}>
        <Button variant='secondary'>
          <div className="flex gap-2">
            Voir le projet sur GitHub
            <RiGithubFill className='size-5' />
          </div>
        </Button>
      </ProjectHeader>
      {selectedProject?.github_repo_url ? (<div></div>) : (
        <LinkGithubProject />
      )}
    </main >
  )
}
