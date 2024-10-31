import { pb } from "@/src/app/pocketbase";
import { IPlayer } from "../model/types";

export async function getPlayerById(id: string): Promise<IPlayer> {
  return await pb
    .collection("players")
    .getOne(id, { headers: { key: String(process.env.POCKETBASE_KEY) } });
}
