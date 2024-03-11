import { AddMemberButton } from '@/components/medias/add-member-button'
import { getCurrentSession, getCurrentUser } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase'
import { PlusCircleIcon } from '@heroicons/react/solid'
import React from 'react'

export type Member = {
  id: string;
  role: string;
  user: {
    user_name: string;
  }
}

type Props = {
  projectName: string
  projectId: string
}

export const AdminButton = async ({ projectName, projectId }: Props) => {
  const user = await getCurrentUser();
  if (!user) return null;
  const session = await getCurrentSession();
  if (!session) return null;
  const supabase = await createSupabaseServerClient();
  const { data: currentUser } = await supabase
    .from('members')
    .select('role')
    .eq('project', projectId)
    .eq('user', user.id)
    .single();

  if (currentUser?.role === 'admin') {
    const { data: members, error: errorMembers } = await supabase
      .from('members')
      .select('id, role, user(user_name)')
      .eq('project', projectId)
      .returns<Array<Member>>();

    if (errorMembers) return null;

    return (
      <AddMemberButton variant='primary' projectname={projectName} access_token={session.provider_token} members={members || []}>
        <div className="flex gap-2">
          Ajouter un membre
          <PlusCircleIcon className='size-5' />
        </div>
      </AddMemberButton>
    )
  } else {
    return null;
  }
}
