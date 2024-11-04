import { getPlayerById } from "@/src/entities/Player/api/getPlayerById";
import Player from "@/src/entities/Player/ui/Player";
import { IMessage } from "@/src/entities/Thread/model/types";
import Attachment from "@/src/shared/ui/Attachment/Attachment";
import dateISOToNormal from "@/src/shared/utils/dateISOtoNormal";
import classNames from "classnames";
import React, { ReactNode } from "react";
import { FaAt } from "react-icons/fa";
import Markdown from "react-markdown";

type Props = { message: IMessage; small?: boolean };

const ThreadMessage = ({ message, small }: Props) => {
  const parseMentionsFromString = (text: string): Array<string | ReactNode> => {
    const finalParagraph: Array<string | ReactNode> = [text];

    for (const match of text.matchAll(/@(\w+!)(\s|)/gm)) {
      const restText = finalParagraph[finalParagraph.length - 1];

      if (!restText || typeof restText != "string") break;

      finalParagraph.pop();
      finalParagraph.push(restText.split(match[0])[0]);

      const player = <Player player={match[1].replace("!", "")} />;

      finalParagraph.push(player);
      finalParagraph.push(restText.split(match[0])[1]);
    }

    return finalParagraph;
  };

  return (
    <div
      className={classNames(`active sm:p-2 md:p-4 flex flex-col gap-1`, {
        "md:border": !small,
      })}
      key={message.id}
    >
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
      <Markdown
        components={{
          p(props) {
            const text: Array<ReactNode | string> | ReactNode = props.children;

            if (!text) return null;

            if (Array.isArray(text)) {
              return (
                <div className="flex flex-wrap gap-2">
                  {text.reduce((acc, el) => {
                    if (typeof el == "string") {
                      return [...acc, ...parseMentionsFromString(el)];
                    } else {
                      return [...acc, el];
                    }
                  }, [])}
                </div>
              );
            } else {
              return (
                <div className="flex flex-wrap gap-2">
                  {parseMentionsFromString(String(text)).map((el, index) =>
                    typeof el == "string" ? <p key={index}>{el}</p> : el
                  )}
                </div>
              );
            }
          },
        }}
        className={classNames("markdown whitespace-pre-wrap", {
          "text-xs": small,
        })}
      >
        {message.content}
      </Markdown>
    </div>
  );
};

export default ThreadMessage;
