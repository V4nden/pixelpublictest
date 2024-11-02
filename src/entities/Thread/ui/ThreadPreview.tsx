import React from "react";
import { IThread } from "../model/types";
import Link from "next/link";
import ThreadHeader from "@/src/widgets/ThreadHeader/ThreadHeader";
import ThreadMessage from "@/src/widgets/ThreadMessage/ThreadMessage";

type Props = { thread: IThread; small?: boolean };

const ThreadPreview = ({ thread, small }: Props) => {
  return (
    <Link
      key={thread.id}
      href={"/threads/" + thread.id}
      className="flex flex-col gap-2 p-4 active border transition-all hover:drop-shadow-glow duration-1000 ease-out"
    >
      <ThreadHeader small={small} thread={thread} />
      {thread.expand?.recentMessage && (
        <div className="relative">
          <div className="bg-gradient-to-t from-background/80 to-background/0 z-10 absolute w-full h-full" />
          <ThreadMessage
            small={small}
            message={{
              ...{
                ...thread.expand?.recentMessage,
                attachments: [],
                content: thread.expand?.recentMessage.content.split("\n")[0],
              },
            }}
          />
        </div>
      )}
    </Link>
  );
};

export default ThreadPreview;
