import { getServerSession as getNextServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const getServerSession = async () => {
  return await getNextServerSession(authOptions);
};

export const getSelectProject = async () => {
  const session = await getServerSession();
  if (!session) return null;
  return session.user.selectProject || null;
};
