import { getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const getGitHubAccessToken = async () => {
  const session = await getServerSession();
  if (!session) return null;

  const res = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  return res?.access_token;
};
