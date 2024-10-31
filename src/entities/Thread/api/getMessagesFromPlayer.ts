import { pb } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";
import { IMessage, IMessageExpandable } from "../model/types";

export default async function getMessagesFromPlayer(
  player: IPlayer,
  expand?: IMessageExpandable[]
): Promise<IMessage[]> {
  return await pb.collection("messages").getFullList({
    expand: expand && expand.join(","),
    filter: `author.id="${player.id}"`,
    headers: { key: String(process.env.POCKETBASE_KEY) },
  });
}
