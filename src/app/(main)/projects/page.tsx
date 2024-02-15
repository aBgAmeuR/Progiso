import { ProjectHeader } from "@/components/global/project-header";
import { SignOutBtn } from "@/components/global/signout-btn";
import { CreateProjectButton } from "@/components/medias/create-project-button";
import { getCurrentUser } from "@/lib/auth";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Divider } from "@tremor/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProjectsList from "./_components/projects-list";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  return (
    <main className="px-8 py-6">
      <ProjectHeader projectName='Mes projets'>
        <SignOutBtn variant="secondary">Sign Out</SignOutBtn>
        <CreateProjectButton>
          <div className="flex gap-2">
            Créer un projet
            <PlusCircleIcon className='size-5' />
          </div>
        </CreateProjectButton>
      </ProjectHeader>
      <Divider />
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsList user={user} />
      </Suspense>
    </main>
  );
}
