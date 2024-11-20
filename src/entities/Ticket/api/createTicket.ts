import { IPBDefault, pb } from "@/src/app/pocketbase";
import { ITicket } from "../model/types";

export default async function createTicket(
  from: string,
  data: { [key: string]: any },
  type: "village" | "report" | "question",
  thread?: string,
  result?: string
): Promise<ITicket> {
  return await pb
    .collection("tickets")
    .create(
      { from, data, thread, result, type },
      { headers: { key: String(process.env.POCKETBASE_KEY) } }
    );
}
