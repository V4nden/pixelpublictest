import Player from "@/src/entities/Player/ui/Player";
import { IMessage, IThread } from "@/src/entities/Thread/model/types";
import dateISOToNormal from "@/src/shared/utils/dateISOtoNormal";
import React from "react";

type Props = {
  thread: IThread;
  messages?: IMessage[];
  hideAuthorNick?: boolean;
  small?: boolean;
};

const ThreadHeader = ({ thread, messages, hideAuthorNick, small }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-text/50">
      <h1
        className={`font-bold ${
          small ? "text-base" : "md:text-xl sm:text-base"
        } text-primary`}
      >
        {thread.name}
      </h1>
      <span className={small ? "text-xs" : "sm:text-xs md:text-base"}>
        От {dateISOToNormal(thread.created)}
      </span>
      {messages && (
        <span className={small ? "text-xs" : "sm:text-xs md:text-base"}>
          сообщений: {messages.length}, последнее в{" "}
          {dateISOToNormal(messages[messages.length - 1].created)}
        </span>
      )}
      <div className="flex flex-grow justify-end">
        {thread.expand?.creator && (
          <Player
            adaptive
            noNick={hideAuthorNick}
            player={thread.expand?.creator}
          />
        )}
      </div>
    </div>
  );
};

export default ThreadHeader;
