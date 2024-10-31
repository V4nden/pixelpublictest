import NextAuth from "next-auth";
import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
export const dynamic = "force-dynamic";
export const revalidate = 1;
