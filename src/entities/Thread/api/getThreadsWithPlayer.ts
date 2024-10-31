import { pb } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";
import getMessagesFromPlayer from "./getMessagesFromPlayer";
import { IThread } from "../model/types";

interface IThreadLink {
  title: string;
  id: string;
}

export default async function getThreadsWithPlayer(
  player: IPlayer
): Promise<string[]> {
  const playerMessages = await getMessagesFromPlayer(player);
  const playerThreadsIds = Array.from(
    new Set(
      playerMessages.map((message) => {
        return message.thread;
      })
    )
  );

  return playerThreadsIds;
}
