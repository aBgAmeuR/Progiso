import { ProjectHeader } from "@/components/global/project-header";
import { getSelectedProject } from "@/lib/project";
import { Divider, Table, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminButton } from "./_components/admin-button";
import { MembersDataTable } from "./_components/members-data-table";
import Loading from "./loading";

export default async function Page() {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) redirect('/projects');

  return (
    <main className="px-8 py-6">
      <ProjectHeader title="Equipe" projectName={selectedProject.name}>
        <Suspense fallback={null}>
          <AdminButton projectName={selectedProject.name} projectId={selectedProject.id} />
        </Suspense>
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
    </main >
  )
}
