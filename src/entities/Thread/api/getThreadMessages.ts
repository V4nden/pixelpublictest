import { pb } from "@/src/app/pocketbase";
import { getPlayerById } from "../../Player/api/getPlayerById";
import { IMessage, IMessageExpandable } from "../model/types";

export async function getThreadMessages(
  thread: string,
  expand?: IMessageExpandable[]
): Promise<IMessage[]> {
  return await pb.collection("messages").getFullList({
    expand: expand && expand.join(","),
    headers: { key: String(process.env.POCKETBASE_KEY) },
    filter: `thread="${thread}"`,
  });
}
