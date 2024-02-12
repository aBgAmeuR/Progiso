import { AddMemberButton } from '@/components/medias/add-member-button'
import { getCurrentUser } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase'
import { PlusCircleIcon } from '@heroicons/react/solid'
import React from 'react'

type Props = {
  projectName: string
  projectId: string
}

export const AdminButton = async ({ projectName, projectId }: Props) => {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('members')
    .select('role')
    .eq('project', projectId)
    .eq('user', user.id)
    .single();

  if (data?.role === 'admin') {
    return (
      <AddMemberButton variant='primary' projectname={projectName}>
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
