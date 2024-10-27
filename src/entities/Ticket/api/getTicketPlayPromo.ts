import { pb } from "@/src/app/pocketbase";
import { ITicketPlay } from "../model/types";

export async function getTicketPlayPromo(ticket: ITicketPlay) {
  return await pb.collection("promos").getFullList({
    filter: 'code="' + ticket.promo + '"',
    $autoCancel: false,
    headers: { key: String(process.env.POCKETBASE_KEY) },
  });
}
