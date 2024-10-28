import { pb } from "@/src/app/pocketbase";
import getPlayersByDID from "@/src/entities/Player/api/getPlayersByDID";
import getPlayersByName from "@/src/entities/Player/api/getPlayersByName";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  const did = req.nextUrl.searchParams.get("did");
  if (!name && !did)
    return NextResponse.json({ error: "No parameter provided" });

  if (name) {
    const [player] = await getPlayersByName(name);
    return NextResponse.json(player);
  }
  if (did) {
    const [player] = await getPlayersByDID(did);
    return NextResponse.json(player);
  }
}
