import { ProjectHeader } from "@/components/global/project-header";
import { getSelectedProject } from "@/lib/project";
import { RiGithubFill, RiGitCommitLine, RiGitBranchFill } from '@remixicon/react';
import { Button, Tab, TabGroup, TabList, TabPanels, TabPanel } from '@tremor/react';
import { redirect } from "next/navigation";
import { LinkGithubProject } from "./_components/link-github-project";
import Link from "next/link";
import { DiagramTab } from "./_components/diagram-tab";
import { CommitsTab } from "./_components/commits-tab";
import { TreeTab } from "./_components/tree-tab";

export default async function Page() {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) redirect('/projects');

  return (
    <main className="px-8 py-6">
      <ProjectHeader title="Code" projectName={selectedProject.name}>
        {selectedProject?.github_repo_url ? (
          <Link href={'https://github.com/' + selectedProject.github_repo_url} target="_blank" passHref>
            <Button variant='secondary'>
              <div className="flex gap-2">
                Voir le projet sur GitHub
                <RiGithubFill className='size-5' />
              </div>
            </Button>
          </Link>
        ) : null}
      </ProjectHeader>
      {selectedProject?.github_repo_url ? (
        <TabGroup className="flex h-[calc(100%-80px)] flex-col pt-2">
          <TabList variant="line" defaultValue="1">
            <Tab>
              <div className="flex items-center">
                <RiGitCommitLine className='size-5' />
                <span className="ml-2">Commits</span>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center">
                <RiGitBranchFill className='size-5' />
                <span className="ml-2">Arbre</span>
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.22222 14.6667C9.22222 15.3915 9.22222 15.7538 9.3406 16.0398C9.49849 16.4209 9.80136 16.7237 10.1825 16.8816C10.4684 17 10.8307 17 11.5556 17H14.6667C15.3915 17 15.7538 17 16.0398 16.8816C16.4209 16.7237 16.7237 16.4209 16.8816 16.0398C17 15.7538 17 15.3915 17 14.6667C17 13.9419 17 13.5795 16.8816 13.2936C16.7237 12.9125 16.4209 12.6096 16.0398 12.4517C15.7538 12.3333 15.3915 12.3333 14.6667 12.3333H11.5556C10.8307 12.3333 10.4684 12.3333 10.1825 12.4517C9.80136 12.6096 9.49849 12.9125 9.3406 13.2936C9.22222 13.5795 9.22222 13.9419 9.22222 14.6667ZM9.22222 14.6667H7.82222C6.95103 14.6667 6.51543 14.6667 6.18268 14.4971C5.88998 14.348 5.65201 14.11 5.50288 13.8173C5.33333 13.4846 5.33333 13.049 5.33333 12.1778V7.66667M5.33333 7.66667H14.6667C15.3915 7.66667 15.7538 7.66667 16.0398 7.54826C16.4209 7.39038 16.7237 7.08755 16.8816 6.7064C17 6.42053 17 6.05813 17 5.33333C17 4.60854 17 4.24614 16.8816 3.96027C16.7237 3.57912 16.4209 3.27629 16.0398 3.11841C15.7538 3 15.3915 3 14.6667 3H5.33333C4.60854 3 4.24614 3 3.96027 3.11841C3.57912 3.27629 3.27629 3.57912 3.11841 3.96027C3 4.24614 3 4.60854 3 5.33333C3 6.05813 3 6.42053 3.11841 6.7064C3.27629 7.08755 3.57912 7.39038 3.96027 7.54826C4.24614 7.66667 4.60854 7.66667 5.33333 7.66667Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Diagramme</span>
              </div>
            </Tab>
          </TabList>
          <TabPanels className="size-full *:size-full *:pt-2" >
            <TabPanel>
              <CommitsTab selectedProject={selectedProject} />
            </TabPanel>
            <TabPanel>
              <TreeTab selectedProjectId={selectedProject.id} />
            </TabPanel>
            <TabPanel>
              <DiagramTab selectedProjectId={selectedProject.id} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      ) : (
        <LinkGithubProject />
      )}
    </main >
  )
}
