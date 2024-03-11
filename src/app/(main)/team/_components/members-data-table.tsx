import { Avatar } from '@/components/ui/avatar';
import { createSupabaseServerClient } from '@/lib/supabase';
import { Badge, TableBody, TableCell, TableRow } from '@tremor/react';
import Image from 'next/image';

const formatDateISOTime = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR');
}

type Member = {
  joined_at: string;
  role: string;
  user: {
    id: string;
    avatar_url: string;
    user_name: string;
    full_name: string;
  }
}

type Props = {
  selectedProjectId: string;
}

export const MembersDataTable = async ({ selectedProjectId }: Props) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('members')
    .select('joined_at, role, user(id, avatar_url, user_name, full_name)')
    .eq('project', selectedProjectId)
    .returns<Array<Member>>();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <TableBody>
      {data.map((member: Member) => (
        <TableRow key={member.user.id}>
          <TableCell>
            <div className='flex items-center gap-4'>
              <Avatar url={member.user.avatar_url} alt={member.user.user_name} />
              <p>{member.user.user_name}</p>
            </div>
          </TableCell>
          <TableCell>
            <Badge>{member.role}</Badge>
          </TableCell>
          <TableCell>{formatDateISOTime(member.joined_at)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
