import NextAuth, {
  NextAuthOptions,
  Session as NextAuthSession,
  User as NextAuthUser,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/libs/prismaClient";

// Extend the built-in Session type
interface Session extends NextAuthSession {
  userId?: string; // Assuming the user ID is a number, adjust the type as necessary
}

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({
      session,
      user,
    }: {
      session: NextAuthSession;
      user: { id: string };
    }) => {
      const customSession: Session = {
        ...session,
        userId: user.id,
      };
      return customSession;
    },
  },
};

export default NextAuth(authOptions);
