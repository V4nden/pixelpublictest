import autopost from "@/src/utils/autopost";
import {
  createTicketPlay,
  getTicketPlayByDiscord,
  pb,
} from "@/src/utils/pocketbase";
import fs from "fs/promises";
import { getServerSession } from "next-auth";
export async function POST(req: Request) {
  const session = await getServerSession();
  if (session && session.user && session.user.image) {
    const body = await req.json();
    if (
      process.env.ADMIN_MAILS?.split(" ").includes(String(session.user.email))
    ) {
      autopost(body.title, body.image, body.content);
      return Response.json({ status: "OK" });
    } else {
      return Response.json({ status: "dinaxy" });
    }
  } else {
    return Response.json({ error: "unauthorized" });
  }
}
