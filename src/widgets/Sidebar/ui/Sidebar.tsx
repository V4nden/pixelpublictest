"use client";
import PlayerNav from "@/src/entities/Player/ui/PlayerNav";
import { IThread } from "@/src/entities/Thread/model/types";
import ThreadPreview from "@/src/entities/Thread/ui/ThreadPreview";
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

type Props = { lastThread?: IThread };

const Sidebar = ({ lastThread }: Props) => {
  const [opened, setOpened] = useState(false);

  const session = useSession();

  const pathname = usePathname();

  const switchOpened = (to?: boolean) => {
    const newOpened = to === undefined ? !opened : to;
    setOpened(newOpened);
    if (newOpened) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  };

  useEffect(() => {
    switchOpened(false);
  }, [pathname]);

  return (
    <>
      <div
        className={`sm:flex md:hidden z-30 fixed p-4 transition-all w-full top-0 left-0`}
      >
        <div className={`${opened ? "w-full" : "w-[0%]"} transition-all`}></div>
        <button
          onClick={() => {
            switchOpened();
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
          </>
        )}

        <div className="flex-grow flex gap-4 flex-col justify-end">
          {session?.data?.user.player && lastThread && (
            <ThreadPreview thread={lastThread} />
          )}
          <hr className="border-primary/25" />
          <div className="flex items-center p-2">
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
