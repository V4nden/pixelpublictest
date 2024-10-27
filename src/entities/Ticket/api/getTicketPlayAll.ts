import { pb } from "@/src/app/pocketbase";

export async function getTicketPlayAll() {
  return await pb
    .collection("ticketplay")
    .getFullList({ headers: { key: String(process.env.POCKETBASE_KEY) } });
}
