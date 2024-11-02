import { IMessage, IThread } from "@/src/entities/Thread/model/types";
import dateISOToNormal from "@/src/shared/utils/dateISOtoNormal";
import React from "react";

type Props = { thread: IThread; messages: IMessage[] };

const ThreadHeader = ({ thread, messages }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-text/50">
      <h1 className="font-bold text-xl text-primary">{thread.name}</h1>
      <span>
        От {thread.expand?.creator && thread.expand?.creator.name}, сообщений:{" "}
        {messages.length}, последнее в{" "}
        {dateISOToNormal(messages[messages.length - 1].created)}
      </span>
    </div>
  );
};

export default ThreadHeader;
