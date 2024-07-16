import PocketBase from "pocketbase";
import { ITicketPlay } from "./types";

export const pb = new PocketBase(process.env.POCKETBASE_URL);

// fetch a paginated records list
export async function getPlayTicketAll() {
  return await pb
    .collection("ticketplay")
    .getFullList({ headers: { key: String(process.env.POCKETBASE_KEY) } });
}

export async function createTicketPlay(ticket: ITicketPlay) {
  await pb
    .collection("ticketplay")
    .create(ticket, { headers: { key: String(process.env.POCKETBASE_KEY) } });
}

export async function getTicketPlayByDiscord(id: string) {
  const all = await pb
    .collection("ticketplay")
    .getFullList({ headers: { key: String(process.env.POCKETBASE_KEY) } });
  return all.filter((el) => el.user.id == id);
}

export async function getTicketPlayById(id: string) {
  return await pb
    .collection("ticketplay")
    .getOne(id, { headers: { key: String(process.env.POCKETBASE_KEY) } });
}
