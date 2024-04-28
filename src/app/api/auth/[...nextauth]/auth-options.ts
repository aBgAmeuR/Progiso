import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GitHubProvider from 'next-auth/providers/github';

import { env } from '@/env.mjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.NEXT_PUBLIC_GITHUB_ID || '',
      clientSecret: env.NEXT_PUBLIC_GITHUB_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      if (params.session) {
        params.session.user.name = params.token.name as string;
        params.session.user.email = params.token.email as string;
        params.session.user.image = params.token.image as string;
        params.session.user.id = params.token.id as string;
        params.session.user.selectProject = (params.token.selectProject ||
          null) as {
          id: string;
          name: string;
          image_url: string;
        } | null;
      }
      return params.session;
    },
    async jwt(params: {
      token: JWT;
      user: User | AdapterUser;
      trigger?: 'signIn' | 'update' | 'signUp' | undefined;
      session?: unknown;
    }) {
      if (params.trigger === 'update' && params.session) {
        const session = params.session as Session;
        return { ...params.token, ...session.user };
      }
      return { ...params.token, ...params.user };
    },
  },
};
