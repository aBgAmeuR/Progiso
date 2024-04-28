'use client';

import React, { PropsWithChildren } from 'react';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export const SessionProvider = ({ children }: PropsWithChildren) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
