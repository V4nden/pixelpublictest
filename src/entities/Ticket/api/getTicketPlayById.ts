import { pb } from "@/src/app/pocketbase";
import { ITicketPlay } from "../model/types";

export async function getTicketPlayById(id: string): Promise<ITicketPlay> {
  return await pb
    .collection("ticketplay")
    .getOne(id, { headers: { key: String(process.env.POCKETBASE_KEY) } });
}
