import { pb } from "@/src/app/pocketbase";
import { IPlayer } from "../model/types";

export default async function getPlayersByDID(did: string): Promise<IPlayer[]> {
  return await pb.collection("players").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    filter: `did="${did}"`,
  });
}
