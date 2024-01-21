import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { log } from "console"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  customField: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id)
      console.log(existingUser)
      if (!existingUser || !existingUser.emailVerified) return false

      return true
    },
    async session({ session, token }) {
      console.log({ sessionToken: token })
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})
