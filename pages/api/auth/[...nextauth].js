import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

const adminEmails = ["devguicordeiro@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,account,profile}) => {
      if (adminEmails.includes(session?.user?.email)){
        return session;
      } else {
        return false;
      }

    }
  }
}

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  res.status(401);
  res.end();
  if (!adminEmails.includes(session?.user?.email)) {
    throw "you're not an admin"
  }
}