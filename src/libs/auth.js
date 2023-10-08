import { PrismaAdapter } from "@auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import prisma from "./prisma"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
}