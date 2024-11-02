import { IThread } from "@/src/entities/Thread/model/types";
import ThreadPreview from "@/src/entities/Thread/ui/ThreadPreview";

type Props = { threads: IThread[] };

const ThreadsPage = ({ threads }: Props) => {
  if (!threads) return null;

  return (
    <main className="min-h-screen flex flex-col gap-4 py-20">
      {threads.map((thread) => {
        return <ThreadPreview key={thread.id} thread={thread} />;
      })}
    </main>
  );
};

export default ThreadsPage;
