import { SignInBtnWithGithub } from "@/components/global/signin-btn-with-github";
import { SignOutBtn } from "@/components/global/signout-btn";
import { CreateProjectButton } from "@/components/medias/create-project-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProjectsList from "./_components/projects-list";
import { Suspense } from "react";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) redirect("/");

  return (
    <main>
      <ThemeToggle />
      <h1>Welcome {user?.user_metadata.user_name}</h1>
      {user ? <SignOutBtn>Sign Out</SignOutBtn> : <SignInBtnWithGithub>Sign In with Github</SignInBtnWithGithub>}
      <CreateProjectButton>
        Create Project
      </CreateProjectButton>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsList user={user} />
      </Suspense>
    </main>
  );
}
