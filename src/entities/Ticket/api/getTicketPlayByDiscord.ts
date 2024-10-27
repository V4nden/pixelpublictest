import { pb } from "@/src/app/pocketbase";
import { ITicketPlay } from "../model/types";

export async function getTicketPlayByDiscord(
  id: string
): Promise<ITicketPlay[]> {
  return await pb.collection("ticketplay").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    filter: `user.id = "${id}"`,
  });
}
