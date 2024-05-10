'use client';

import Fuse from 'fuse.js';
import { useQueryState } from 'nuqs';

import { getProjectMembers } from '../services';
import { MemberTableRow } from './member-table-row';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const options = {
  keys: ['user.name'],
  threshold: 0.4, // seuil de similarité
};

type TMembersTableProps = {
  members: Awaited<ReturnType<typeof getProjectMembers>>;
};

export const MembersTable = ({ members }: TMembersTableProps) => {
  const [nameFilter, setNameFilter] = useQueryState('name');
  const fuse = new Fuse(members || [], options);

  const filteredMembers = nameFilter
    ? fuse.search(nameFilter).map((result) => result.item)
    : members || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          value={nameFilter || ''}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-64"
          placeholder="Search Member..."
        />
        <Button>Invite</Button>
      </div>
      <div className="flex flex-col divide-y rounded-md border">
        <div className="bg-secondary flex justify-between p-4">
          <p className="w-60">Id</p>
          <p>Name</p>
          <p>Role</p>

          <div className="data-[state=open]:bg-muted flex size-8 p-0"></div>
        </div>
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <MemberTableRow key={member.id} member={member} />
          ))
        ) : (
          <h2>No result</h2>
        )}
      </div>
    </div>
  );
};
