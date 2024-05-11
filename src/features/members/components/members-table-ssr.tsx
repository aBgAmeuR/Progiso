import React from 'react';

import { getProjectMembers, getRoleOfCurrentUser } from '../services';
import { MembersTable } from './members-table';

export const MembersTableSSR = async () => {
  const members = await getProjectMembers();
  if (!members) return null;

  const currentUserRole = await getRoleOfCurrentUser();
  if (!currentUserRole) return null;

  return <MembersTable members={members} currentUserRole={currentUserRole} />;
};
