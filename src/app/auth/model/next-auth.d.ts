import { IPlayer } from "@/src/entities/Player/model/types";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      player: IPlayer | undefined; // Add Discord ID type
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
  }
}
