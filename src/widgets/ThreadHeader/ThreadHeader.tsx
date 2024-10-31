import { IMessage, IThread } from "@/src/entities/Thread/model/types";
import moment from "moment";
import React from "react";

type Props = { thread: IThread; messages: IMessage[] };

const ThreadHeader = ({ thread, messages }: Props) => {
  return (
    <div className="flex items-center gap-2 text-text/50">
      <h1 className="font-bold text-xl text-primary">{thread.name}</h1>
      <span>
        От {thread.expand?.creator && thread.expand?.creator.name}, сообщений:{" "}
        {messages.length}, последнее в{" "}
        {moment(messages[messages.length - 1].created).format(
          "HH:mm, DD.MM.yyyy"
        )}
      </span>
    </div>
  );
};

export default ThreadHeader;
