import { getServerSession as getNextServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const getServerSession = async () => {
  return await getNextServerSession(authOptions);
};
