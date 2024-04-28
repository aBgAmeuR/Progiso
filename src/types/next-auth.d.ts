// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    email: string;
    name: string;
    image: string;
    selectProject: {
      id: string;
      name: string;
      image_url: string;
    } | null;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  /**
   * Returned by the `session` callback and `getSession` (client side)
   */
  interface JWT {
    User;
  }
}
