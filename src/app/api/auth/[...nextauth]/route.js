import { GOOGLE_ID, GOOGLE_SECRET, SECRET } from '../../../../utils/secrets';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import prisma from '../../../../utils/prisma';
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const email = user.email;
        let userData = {};
        try {
          userData = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!userData) {
            userData = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                photo: user.image,
              },
            });
          }
          token.user = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            photo: userData.photo,
          };
        } catch (e) {
          console.log('error', e);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session = { ...session, ...token };
      }
      return session;
    },
  },
  secret: SECRET,
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
