import { getProjectMembers } from '../services';
import { MembersTable } from './members-table';

export const MembersTableSSR = async () => {
  const members = await getProjectMembers();

  return <MembersTable members={members} />;
};
