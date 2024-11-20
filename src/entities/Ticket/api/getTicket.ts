import { pb } from "@/src/app/pocketbase";
import { ITicket, ITicketExpandable } from "../model/types";

export default async function getTicket(
  id: string,
  expand?: ITicketExpandable[]
): Promise<ITicket | null> {
  return await pb
    .collection("tickets")
    .getOne(id, {
      headers: { key: String(process.env.POCKETBASE_KEY) },
      expand: expand && expand.join(","),
    });
}
