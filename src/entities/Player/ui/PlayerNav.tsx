"use client";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import getPlayersByDID from "../api/getPlayersByDID";
import { IPlayer } from "../model/types";
import Image from "next/image";
import classnames from "classnames";
import { FaDoorClosed } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
import PlayerNavSkeleton from "./PlayerNav.skeleton";

type Props = { session: Session };

const PlayerNav = ({ session }: Props) => {
  const player: IPlayer | undefined = session.user.player;

  if (!session) return <PlayerNavSkeleton />;

  return (
    <div
      className={classnames(
        "flex items-center gap-2 relative group/navplayer cursor-pointer",
        { "drop-shadow-glow": player && player.plus }
      )}
      onClick={() => {
        signOut();
      }}
    >
      {player ? (
        <Image
          alt="player head"
          width={24}
          height={24}
          src={`https://starlightskins.lunareclipse.studio/render/pixel/${
            player.skin != "null" ? player.name : "Steve"
          }/face${
            player.skin != "null"
              ? `?skinUrl=${player.skin}`
              : `?skinUrl=${"https://s.namemc.com/i/63455d7069b397c2.png"}`
          }`}
          className="rounded-md"
        />
      ) : (
        <Image
          alt="player head"
          width={24}
          height={24}
          src={session.user.image ?? "user-circle-solid-168.png"}
          className="rounded-md"
        />
      )}
      <span
        className={classnames("font-black sm:hidden md:block", {
          "text-accent": player && player.plus,
        })}
      >
        {player ? player.name : session.user.name}
      </span>
      <button className="absolute left-[30%] top-1/2 -translate-y-1/2 p-2 transition-all ease-out opacity-0 -z-1 group-hover/navplayer:left-[100%] group-hover/navplayer:opacity-100 text-primary group-active/navplayer:text-accent">
        <MdOutlineLogout />
      </button>
    </div>
  );
};

export default PlayerNav;
