"use client";
import Player from "@/src/entities/Player/ui/Player";
import PlayerNav from "@/src/entities/Player/ui/PlayerNav";
import PlayerNavSkeleton from "@/src/entities/Player/ui/PlayerNav.skeleton";
import { IThread } from "@/src/entities/Thread/model/types";
import ThreadPreview from "@/src/entities/Thread/ui/ThreadPreview";
import NavigationItem from "@/src/features/NavigationItem/NavigationItem";
import dateISOToNormal from "@/src/shared/utils/dateISOtoNormal";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaCodeBranch,
  FaHome,
  FaNewspaper,
  FaPage4,
  FaTicketAlt,
  FaUserTie,
} from "react-icons/fa";
import {
  FaNoteSticky,
  FaPeopleGroup,
  FaThreads,
  FaWebflow,
} from "react-icons/fa6";
import Markdown from "react-markdown";

type Props = { lastThread?: IThread };

const NavBar = ({ lastThread }: Props) => {
  const session = useSession();
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    setScroll(window.scrollY);
    window.addEventListener("scroll", (e) => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav
      className={classNames(
        `fixed top-0 left-0 duration-1000 z-10 py-4 place-items-center transition-all w-full border-b border-primary/0 sm:hidden md:block`,
        { "bg-background/25 border-primary/25 backdrop-blur-sm": scroll > 30 }
      )}
    >
      <div className="m-auto sm:w-[95%] md:w-[75%] lg:w-[65%] grid grid-cols-3 max-w-[1600px]">
        <Link href={"/"} className="flex gap-2 items-center place-self-start">
          <h1 className="font-bold text-2xl">Pixel</h1>
          <p className="font-semibold bg-accent rounded-full px-2 text-sm sm:hidden md:block">
            Beta
          </p>
        </Link>
        <div className="md:text-sm sm:text-base flex gap-2 font-semibold justify-center">
          <Link
            href={"/"}
            className="flex gap-2 p-2 items-center justify-start"
          >
            <FaHome /> <p className="sm:hidden lg:block">Главная</p>
          </Link>
          <Link
            href={"/wiki"}
            className="flex gap-2 p-2 items-center justify-start"
          >
            <FaNoteSticky /> <p className="sm:hidden lg:block">Вики</p>
          </Link>
          <Link
            href={"/news"}
            className="flex gap-2 p-2 items-center justify-start"
          >
            <FaNewspaper /> <p className="sm:hidden lg:block">Новости</p>
          </Link>
          {/* <Link href={"/dev"} className="flex gap-2 items-center text-text/50">
            <FaPeopleGroup /> <p className="sm:hidden lg:block">Игроки</p>
          </Link> */}

          {session.data?.user.player ? (
            <div className="flex gap-2 items-center justify-start relative p-2 group/players cursor-pointer">
              <FaPeopleGroup /> <p className="sm:hidden lg:block">Игрокам</p>
              <div className="absolute flex flex-col gap-4 invisible opacity-0 group-hover/players:opacity-100 group-hover/players:visible top-full left-1/2 -translate-x-1/2 active border p-4 w-max transition-all">
                <NavigationItem
                  to="/threads"
                  title="Треды"
                  description="Треды игроков сервера"
                  icon={FaCodeBranch}
                />
                <hr className="border-primary/25" />
                <NavigationItem
                  to="/tickets"
                  title="Тикеты"
                  description="Взаимодействие с администрацией"
                  icon={FaTicketAlt}
                />
                <hr className="border-primary/25" />
                <NavigationItem
                  to="https://t.me/connectsomnoi"
                  title="Поддержка"
                  description="По всем вопросам сюда"
                  icon={FaUserTie}
                />
                <div>
                  {lastThread && <ThreadPreview small thread={lastThread} />}
                </div>
              </div>
            </div>
          ) : (
            <Link
              href={"https://t.me/connectsomnoi"}
              className="flex gap-2 items-center"
            >
              <FaUserTie /> <p className="sm:hidden lg:block">Поддержка</p>
            </Link>
          )}
        </div>
        <div className="place-self-end h-full flex items-center">
          {session.status == "loading" ? (
            <PlayerNavSkeleton />
          ) : session.status == "authenticated" ? (
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
    </nav>
  );
};

export default NavBar;
