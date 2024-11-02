"use client";
import Player from "@/src/entities/Player/ui/Player";
import PlayerNav from "@/src/entities/Player/ui/PlayerNav";
import { IThread } from "@/src/entities/Thread/model/types";
import NavigationItem from "@/src/features/NavigationItem/NavigationItem";
import dateISOToNormal from "@/src/shared/utils/dateISOtoNormal";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCodeBranch,
  FaHome,
  FaInfo,
  FaNewspaper,
  FaTicketAlt,
  FaUserTie,
} from "react-icons/fa";
import Markdown from "react-markdown";

type Props = { userThreads?: IThread[] };

const Sidebar = ({ userThreads }: Props) => {
  const [opened, setOpened] = useState(false);

  const session = useSession();

  const pathname = usePathname();

  useEffect(() => {
    setOpened(false);
  }, [pathname]);

  return (
    <>
      <div
        className={`sm:flex md:hidden z-30 fixed p-4 transition-all w-full top-0 left-0`}
      >
        <div className={`${opened ? "w-full" : "w-[0%]"} transition-all`}></div>
        <button
          onClick={() => {
            setOpened(!opened);
          }}
          className={`p-2 active border ${
            opened ? "rotate-0" : "rotate-180"
          } transition-all ease-out`}
        >
          <FaArrowLeft />
        </button>
      </div>
      <aside
        className={`sm:flex md:hidden flex-col gap-4 fixed min-h-screen w-full top-0 active border-r z-20 p-4 transition-all ${
          opened ? "-left-0" : "-left-full"
        }`}
      >
        <div className="relative flex justify-between">
          <Link href={"/"} className="flex gap-2 items-center w-full">
            <h1 className="font-bold text-2xl">Pixel</h1>
            <p className="font-semibold bg-accent rounded-full px-2 text-sm">
              Beta
            </p>
          </Link>
        </div>
        <hr className="border-primary/25" />
        <NavigationItem
          visible
          to="/"
          title="Главная"
          description="Сводка о нас"
          icon={FaHome}
        />
        <NavigationItem
          visible
          to="/wiki/about"
          title="Вики"
          description="Вся информация о сервере"
          icon={FaInfo}
        />
        <NavigationItem
          visible
          to="/news"
          title="Новости"
          description="Актуальные события сервера"
          icon={FaNewspaper}
        />
        <hr className="border-primary/25" />
        {session?.data?.user.player && (
          <>
            <NavigationItem
              visible
              to="/tickets"
              title="Тикеты"
              description="Взаимодействие с администрацией"
              icon={FaTicketAlt}
            />
            <NavigationItem
              visible
              to="https://t.me/connectsomnoi"
              title="Поддержка"
              description="По всем вопросам сюда"
              icon={FaUserTie}
            />
            <NavigationItem
              visible
              to="/threads"
              title="Треды"
              description="Треды игроков сервера"
              icon={FaCodeBranch}
            />
            {userThreads && (
              <div className="flex flex-col h-full justify-between gap-2 overflow-y-hidden">
                {userThreads.map((thread) => {
                  return (
                    <Link
                      key={"sidebar" + thread.id}
                      href={"/threads/" + thread.id}
                      className="flex flex-col gap-1 p-2 active border hover:drop-shadow-glow transition-all duration-1000"
                    >
                      <div className="flex gap-2 justify-between">
                        <div className="flex gap-2 items-center flex-wrap">
                          <h3>{thread.name}</h3>
                          <span className="text-[10px] text-text/25">
                            {dateISOToNormal(thread.updated)}
                          </span>
                        </div>
                        {thread.expand?.creator && (
                          <Player
                            size="small"
                            noNick
                            player={thread.expand?.creator}
                          />
                        )}
                      </div>
                      {thread.expand?.recentMessage &&
                        (() => {
                          let messageCut = thread.expand?.recentMessage.content
                            .split("\n")[0]
                            .slice(0, 30);

                          if (messageCut.length == 30) {
                            messageCut += "...";
                          }

                          return (
                            <p className="text-xs text-text/50">
                              <Markdown>{messageCut}</Markdown>
                            </p>
                          );
                        })()}
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="flex-grow flex gap-4 flex-col justify-end">
          <hr className="border-primary/25" />
          <div className="flex items-center p-2 active border">
            {session && session.data ? (
              <PlayerNav session={session.data} />
            ) : (
              <button
                onClick={() => {
                  signIn("discord");
                }}
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
