import { createSupabaseServerClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import ProjectComponent from "./project-component";

type Props = {
  user: User;
};

export default async function ProjectsList({ user }: Props) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*, members(user(*), role, joined_at)')
    .eq('members.user', user.id)

  if (error) {
    console.error(error);
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((project) => (
        <ProjectComponent key={project.id} project={project} />
      ))}
    </div>
  );
}
