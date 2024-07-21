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
    async signIn({ user, account, profile, credentials }) {
      const res = await fetch("https://discordapp.com/api/users/@me/guilds", {
        headers: {
          Authorization: "Bearer " + account.access_token,
          "Content-Type": "application/json",
        },
      });
      if (
        (await res.json()).filter((el) => {
          return el.id == 1055112549844123718;
        }).length
      ) {
        return true;
      } else {
        return "https://discord.gg/6uf5ZStHP5";
      }
    },
    session({ session, token }) {
      session.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
