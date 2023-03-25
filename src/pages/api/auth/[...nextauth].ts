import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from '@/lib/db'

export default NextAuth({
	adapter: PrismaAdapter(db),
	callbacks: {
		session: async ({ session, token, user }) => {
			if (session?.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
})