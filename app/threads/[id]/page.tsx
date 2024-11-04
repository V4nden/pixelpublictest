import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";
import { getThreadById } from "@/src/entities/Thread/api/getThreadBtId";
import { getThreadMessages } from "@/src/entities/Thread/api/getThreadMessages";
import {
  IMessageExpandable,
  IThreadExpandable,
} from "@/src/entities/Thread/model/types";
import ThreadPage from "@/src/pages/thread/ThreadPage";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession, NextAuthOptions } from "next-auth";
import { RedirectType, redirect } from "next/navigation";
import { cache } from "react";

type Props = { params: { id: string } };

const cachedGetThreadById = cache(
  async (id: string, expand?: IThreadExpandable[]) => {
    return getThreadById(id, expand);
  }
);

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!params || params.id.length != 15)
    return {
      title: "Ошибка",
    };

  const session = await getServerSession(nextAuthOptions);
  if (!session)
    return {
      title: "Ошибка",
    };

  const thread = await cachedGetThreadById(params.id, [
    IThreadExpandable.RECENT_MESSAGE,
    IThreadExpandable.ALLOWED,
    IThreadExpandable.CREATOR,
  ]);
  if (!thread)
    return {
      title: "Ошибка",
    };

  return {
    title: "Pixel - Ветка - " + thread.title,
    description: thread.expand?.recentMessage
      ? thread.expand?.recentMessage.content
      : "Ветка создана",
  };
}

const Thread = async ({ params }: Props) => {
  if (!params || params.id.length != 15) return <div>syms</div>;

  const session = await getServerSession(nextAuthOptions);
  if (!session) return redirect("/api/auth/signin", RedirectType.replace);

  const thread = await cachedGetThreadById(params.id, [
    IThreadExpandable.RECENT_MESSAGE,
    IThreadExpandable.ALLOWED,
    IThreadExpandable.CREATOR,
  ]);
  if (!thread) return redirect("/not-found", RedirectType.replace);

  if (
    thread.expand?.allowed &&
    thread.expand?.allowed.find((player) => player.id != session.user.player.id)
  ) {
    return redirect("/not-allowed", RedirectType.replace);
  }

  const messages = await getThreadMessages(params.id, [
    IMessageExpandable.AUTHOR,
  ]);

  return <ThreadPage thread={thread} messages={messages} />;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default Thread;
