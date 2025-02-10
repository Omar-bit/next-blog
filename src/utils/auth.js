import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { GOOGLE_ID, GOOGLE_SECRET } from './secrets';

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  debug: true,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name;
      return token;
    },
  },
  basePath: '/auth',
  session: { strategy: 'jwt' },
});
