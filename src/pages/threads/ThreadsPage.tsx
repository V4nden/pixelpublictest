import Player from "@/src/entities/Player/ui/Player";
import { IThread } from "@/src/entities/Thread/model/types";
import dateISOToNormal from "@/src/shared/utils/dateISOtoNormal";
import ThreadMessage from "@/src/widgets/ThreadMessage/ThreadMessage";
import Link from "next/link";

type Props = { threads: IThread[] };

const ThreadsPage = ({ threads }: Props) => {
  if (!threads) return null;

  const getRecentMessageAuthor = (thread: IThread) => {
    return thread.expand?.participants.find(
      (player) => player.id == thread.expand?.recentMessage.author
    );
  };

  return (
    <main className="min-h-screen flex flex-col gap-4 py-20">
      {threads.map((thread) => {
        return (
          <Link
            key={thread.id}
            href={"/threads/" + thread.id}
            className="flex flex-col gap-2 p-4 active border transition-all hover:drop-shadow-glow duration-1000 ease-out"
          >
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black">{thread.name}</h1>
              <div className="flex gap-2 items-center text-text/50">
                <span>От</span>
                {thread.expand?.creator && (
                  <Player player={thread.expand?.creator} />
                )}
                {thread.expand?.recentMessage && (
                  <span>
                    {dateISOToNormal(thread.expand?.recentMessage.created)}
                  </span>
                )}
                <span>{dateISOToNormal(thread.created)}</span>
              </div>
            </div>

            {thread.expand?.recentMessage &&
              thread.expand?.participants &&
              (() => {
                const recentMessageAuthor = getRecentMessageAuthor(thread);
                return (
                  <div className="relative">
                    <div className="bg-gradient-to-t from-background/80 to-background/0 z-10 absolute w-full h-full" />
                    <ThreadMessage
                      message={{
                        ...thread.expand?.recentMessage,
                        expand: { author: recentMessageAuthor },
                      }}
                    />
                  </div>
                );
              })()}
          </Link>
        );
      })}
    </main>
  );
};

export default ThreadsPage;
