"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
      className={`fixed top-0 left-0 duration-1000 z-10 p-4 md:px-32 sm:p-4 lg:px-64 place-items-center transition-all grid grid-cols-2 w-full ${
        scroll > 0 && "bg-background/75"
      } backdrop-blur-sm`}
    >
      <Link href={"/"} className="flex gap-2 items-center place-self-start">
        <h1 className="font-bold text-2xl">Pixel</h1>
        <p className="font-semibold bg-accent rounded-full px-2 text-sm">
          Beta
        </p>
      </Link>
      {/* <div className="text-sm flex gap-6 font-semibold justify-center">
        <Link href={"/"}>Главная</Link>
        <Link href={"/dev"}>Новости</Link>
        <Link href={"/dev"}>Игроки</Link>
      </div> */}
      <div className="place-self-end">
        {session.data ? (
          <button
            onClick={() => {
              signOut();
            }}
            className="flex items-center gap-2"
          >
            <span className="font-bold text-text/85">
              {session.data.user?.name}
            </span>
            <Image
              width={1920}
              height={1080}
              src={
                session.data.user
                  ? session.data.user.image
                    ? session.data.user.image
                    : ""
                  : ""
              }
              alt=""
              className="w-8 h-8 rounded-full"
            />
          </button>
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
    </nav>
  );
};

export default NavBar;
