import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, token }) {
      session.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
