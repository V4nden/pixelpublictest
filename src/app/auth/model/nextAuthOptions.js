import getPlayersByDID from "@/src/entities/Player/api/getPlayersByDID";
import DiscordProvider from "next-auth/providers/discord";

export const nextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=guilds+guilds.join+identify+email",
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
        const joinres = await fetch(
          `https://discord.com/api/v10/guilds/1055112549844123718/members/${account.providerAccountId}`,
          {
            method: "PUT",
            body: JSON.stringify({
              access_token: `${account.access_token}`,
            }),
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT}`,
              "Content-Type": "application/json",
            },
          }
        );
        return true;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.player = (await getPlayersByDID(user.id))[0];
      }
      return token;
    },
    async session({ session, token }) {
      session.user.player = token.player;
      return session;
    },
  },
};
