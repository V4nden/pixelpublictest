import { pb } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";
import { IThread } from "../model/types";

export default async function createThread(
  title: string,
  creator: IPlayer,
  creationMessage?: string,
  isPrivate?: boolean,
  allowed?: string[]
): Promise<IThread> {
  const threadRequest: IThread = await pb.collection("threads").create(
    {
      title,
      creator: creator.id,
      private: isPrivate,
      allowed: allowed,
    },
    { headers: { key: String(process.env.POCKETBASE_KEY) } }
  );
  await pb.collection("messages").create(
    {
      content: creationMessage || `Начало треда`,
      thread: threadRequest.id,
    },
    { headers: { key: String(process.env.POCKETBASE_KEY) } }
  );

  return threadRequest;
}
