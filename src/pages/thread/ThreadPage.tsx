"use client";

import { IMessage, IThread } from "@/src/entities/Thread/model/types";
import ThreadHeader from "@/src/widgets/ThreadHeader/ThreadHeader";
import ThreadInput from "@/src/widgets/ThreadInput/ui/ThreadInput";
import ThreadMessage from "@/src/widgets/ThreadMessage/ThreadMessage";
import { useEffect, useState } from "react";

type Props = { thread: IThread; messages: IMessage[] };

const ThreadPage = ({ thread, messages }: Props) => {
  const [messagesState, setMessagesState] = useState<IMessage[]>(messages);

  useEffect(() => {
    if (window) window.scrollTo(0, document.body.scrollHeight);
  }, [messagesState]);

  if (!thread || !messages) return;

  // const refreshThread = async () => {
  //   const threadResponse = await fetch("/api/threads?id=" + thread.id);
  //   const threadJson: Required<IThread> = await threadResponse.json();

  //   const messagesResponse = await fetch(
  //     "/api/threads/messages?id=" + thread.id
  //   );
  //   const messagesJson: IMessage[] = await messagesResponse.json();
  //   setMessagesState(messagesJson);
  // };

  return (
    <main className="min-h-screen flex flex-col gap-4 py-20">
      <ThreadHeader thread={thread} messages={messagesState} />
      {messagesState &&
        messagesState.map((message) => {
          return <ThreadMessage key={message.id} message={message} />;
        })}
      <ThreadInput thread={thread} updateMessages={setMessagesState} />
    </main>
  );
};

export default ThreadPage;
