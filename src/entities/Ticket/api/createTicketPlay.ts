import { pb } from "@/src/app/pocketbase";
import { ITicketPlay } from "../model/types";

export async function createTicketPlay(ticket: ITicketPlay) {
  await pb
    .collection("ticketplay")
    .create(ticket, { headers: { key: String(process.env.POCKETBASE_KEY) } });
}
