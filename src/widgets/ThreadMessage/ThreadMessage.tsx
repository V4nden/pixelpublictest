import Player from "@/src/entities/Player/ui/Player";
import { IMessage } from "@/src/entities/Thread/model/types";
import Attachment from "@/src/shared/ui/Attachment/Attachment";
import dateISOToNormal from "@/src/shared/utils/dateISOtoNormal";
import React from "react";
import Markdown from "react-markdown";

type Props = { message: IMessage };

const ThreadMessage = ({ message }: Props) => {
  return (
    <div className="active p-4 flex flex-col gap-1 border" key={message.id}>
      <div className="flex items-center gap-2">
        {message.expand?.author && <Player player={message.expand?.author} />}
        <span className="text-xs text-text/50">
          {dateISOToNormal(message.created)}
        </span>
      </div>
      {message.attachments && (
        <div className="flex flex-col gap-2">
          {message.attachments.map((attachment) => (
            <Attachment
              key={attachment}
              collection={message.collectionId}
              record={message.id}
              file={attachment}
            />
          ))}
        </div>
      )}
      <Markdown className={"markdown"}>{message.content}</Markdown>
    </div>
  );
};

export default ThreadMessage;
