"use client";
import PlayerNav from "@/src/entities/Player/ui/PlayerNav";
import PlayerNavSkeleton from "@/src/entities/Player/ui/PlayerNav.skeleton";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHome, FaNewspaper, FaUserTie } from "react-icons/fa";
import { FaNoteSticky, FaPeopleGroup, FaWebflow } from "react-icons/fa6";

type Props = {};

const NavBar = (props: Props) => {
  const session = useSession();
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 duration-1000 z-10 py-4 place-items-center transition-all w-full border-b border-primary/0 ${
        scroll > 30 && "bg-background/25 border-primary/25 backdrop-blur-sm"
      } `}
    >
      <div className="m-auto sm:w-[95%] md:w-[75%] lg:w-[65%] grid grid-cols-3 max-w-[1600px]">
        <Link href={"/"} className="flex gap-2 items-center place-self-start">
          <h1 className="font-bold text-2xl">Pixel</h1>
          <p className="font-semibold bg-accent rounded-full px-2 text-sm sm:hidden md:block">
            Beta
          </p>
        </Link>
        <div className="md:text-sm sm:text-base flex gap-6 font-semibold justify-center">
          <Link href={"/"} className="flex gap-2 items-center">
            <FaHome /> <p className="sm:hidden lg:block">Главная</p>
          </Link>
          <Link href={"/wiki"} className="flex gap-2 items-center">
            <FaNoteSticky /> <p className="sm:hidden lg:block">Вики</p>
          </Link>
          <Link href={"/news"} className="flex gap-2 items-center">
            <FaNewspaper /> <p className="sm:hidden lg:block">Новости</p>
          </Link>
          {/* <Link href={"/dev"} className="flex gap-2 items-center text-text/50">
            <FaPeopleGroup /> <p className="sm:hidden lg:block">Игроки</p>
          </Link> */}
          <Link
            href={"https://t.me/connectsomnoi"}
            className="flex gap-2 items-center"
          >
            <FaUserTie /> <p className="sm:hidden lg:block">Поддержка</p>
          </Link>
        </div>
        <div className="place-self-end">
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
