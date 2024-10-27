import { pb } from "@/src/app/pocketbase";
import { ITicketPlay, ITicketPlayPromo } from "../model/types";

export async function getTicketPlayPromos(
  ticket: ITicketPlay
): Promise<ITicketPlayPromo[]> {
  return await pb.collection("promos").getFullList({
    filter: 'code="' + ticket.promo + '"',
    $autoCancel: false,
    headers: { key: String(process.env.POCKETBASE_KEY) },
  });
}
