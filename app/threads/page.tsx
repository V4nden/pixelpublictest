import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";
import getThreadsPublic from "@/src/entities/Thread/api/getThreadsPublic";
import { IThreadExpandable } from "@/src/entities/Thread/model/types";
import ThreadsPage from "@/src/pages/threads/ThreadsPage";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";

type Props = {};

const Threads = async (props: Props) => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) return redirect("/api/auth/signin", RedirectType.replace);

  const threads = await getThreadsPublic([
    IThreadExpandable.CREATOR,
    IThreadExpandable.RECENT_MESSAGE,
    IThreadExpandable.PARTICIPANTS,
  ]);

  if (!threads) return redirect("/not-found", RedirectType.push);

  return <ThreadsPage threads={threads} />;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default Threads;
