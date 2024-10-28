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
  const [player, setPlayer] = useState<IPlayer | null>(null);

  const fetchPlayer = async () => {
    //@ts-ignore
    setPlayer(await (await fetch("/api/player?did=" + session.id)).json());
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  if (!player) return <PlayerNavSkeleton />;

  return (
    <div className="flex items-center gap-2 relative group/navplayer cursor-pointer">
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
      <span
        className={classnames("font-black", { "text-accent": player.plus })}
      >
        {player.name}
      </span>
      <button
        onClick={() => {
          signOut();
        }}
        className="absolute left-[70%] top-1/2 -translate-y-1/2 transition-all ease-out opacity-0 -z-1 group-hover/navplayer:left-[110%] group-hover/navplayer:opacity-100 text-primary group-active/navplayer:text-accent"
      >
        <MdOutlineLogout />
      </button>
    </div>
  );
};

export default PlayerNav;
