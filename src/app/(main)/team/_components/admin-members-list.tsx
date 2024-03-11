import { Select, SelectItem, TableBody, TableCell, TableRow } from '@tremor/react';
import { Member } from './admin-button';

const roles = ["guest", "contributor", "admin"] as const;

type Props = {
  members: Array<Member>,
}

export const AdminMembersList = ({ members }: Props) => {
  return (
    <TableBody>
      {members.map((member: Member) => (
        <TableRow key={member.id}>
          <TableCell>
            {member.user.user_name}
          </TableCell>
          <TableCell>
            <Select defaultValue={member.role}>
              {roles.map((role: string) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </Select>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
