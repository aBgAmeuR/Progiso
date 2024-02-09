import { getSelectedProject } from "@/lib/project";
import { redirect } from "next/navigation";

export default async function Page() {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) redirect('/projects');

  return (
    <main className="px-8 py-6">
      <h1>Messages</h1>
    </main>
  )
}
