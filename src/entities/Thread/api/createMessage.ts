import { pb } from "@/src/app/pocketbase";
import { IMessage } from "../model/types";

export default async function createMessage(
  message: { authorId: string; content: string; attachments?: File[] },
  threadId: string
) {
  const messageRequest = await pb.collection("messages").create(
    {
      author: message.authorId,
      attachments: message.attachments,
      content: message.content,
      thread: threadId,
    },
    { headers: { key: String(process.env.POCKETBASE_KEY) } }
  );
  await pb
    .collection("threads")
    .update(
      threadId,
      { recentMessage: messageRequest, "participants+": [message.authorId] },
      { headers: { key: String(process.env.POCKETBASE_KEY) } }
    );

  return messageRequest;
}
