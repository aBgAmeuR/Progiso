import { ProjectHeader } from "@/components/global/project-header";
import { getSelectedProject } from "@/lib/project";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Divider, Table, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { redirect } from "next/navigation";
import { MembersDataTable } from "./_components/members-data-table";
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page() {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) redirect('/projects');

  const user = await getCurrentUser();
  if (!user) redirect('/auth/signin');

  return (
    <main className="px-8 py-6">
      <ProjectHeader title="Equipe" projectName={selectedProject.name}>
        <Button variant='primary'>
          <div className="flex gap-2">
            Ajouter un membre
            <PlusCircleIcon className='size-5' />
          </div>
        </Button>
      </ProjectHeader>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Membre</TableHeaderCell>
            <TableHeaderCell>Rôle</TableHeaderCell>
            <TableHeaderCell>Date d&apos;adhésion</TableHeaderCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<Loading />}>
          <MembersDataTable selectedProjectId={selectedProject.id} />
        </Suspense>
      </Table>
    </main>
  )
}
