'use client';

import Fuse from 'fuse.js';
import { useQueryState } from 'nuqs';

import { TMember } from '../types';
import { AddMemberDialog } from './add-member-dialog';
import { MemberTableRow } from './member-table-row';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const options = {
  keys: ['user.name'],
  threshold: 0.4, // seuil de similarité
};

type TMembersTableProps = {
  members: TMember[];
  currentUserRole: string;
};

export const MembersTable = ({
  members,
  currentUserRole,
}: TMembersTableProps) => {
  const [nameFilter, setNameFilter] = useQueryState('name');
  const fuse = new Fuse(members || [], options);

  const filteredMembers = nameFilter
    ? fuse.search(nameFilter).map((result) => result.item)
    : members || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Input
          value={nameFilter || ''}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-64"
          placeholder="Search Member..."
        />
        {['OWNER', 'ADMIN'].includes(currentUserRole) ? (
          <AddMemberDialog />
        ) : null}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <MemberTableRow
              key={member.user.id}
              member={member}
              currentUserRole={currentUserRole}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
