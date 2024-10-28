import { pb } from "@/src/app/pocketbase";

export default async function getPlayersAll() {
  return await pb.collection("players").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
  });
}
