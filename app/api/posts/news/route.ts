import { pb } from "@/src/app/pocketbase";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await pb
    .collection("news")
    .getFullList({ headers: { key: String(process.env.POCKETBASE_KEY) } });
  return NextResponse.json(res);
}
