import { pb } from "@/src/app/pocketbase";
import getPlayersByDID from "@/src/entities/Player/api/getPlayersByDID";
import getPlayersByName from "@/src/entities/Player/api/getPlayersByName";
import { getThreadById } from "@/src/entities/Thread/api/getThreadBtId";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No parameter provided" });

  const session = await getServerSession(nextAuthOptions);
  if (!session) return NextResponse.json({ error: "Unauthorizes" });

  const thread = await getThreadById(id);
  if (!thread) return NextResponse.json({ error: "Not found" });

  if (thread && thread.allowed) {
    if (!thread.allowed.includes(session.user.player))
      return NextResponse.json({ error: "Not allowed" });
  }

  return NextResponse.json(thread);
}
