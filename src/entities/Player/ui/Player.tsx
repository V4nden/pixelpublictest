"use client";

import React, { useEffect, useState } from "react";
import { IPlayer } from "../model/types";
import Image from "next/image";
import classNames from "classnames";
import PlayerNavSkeleton from "./PlayerNav.skeleton";

type Props = {
  player: IPlayer | string;
  noNick?: boolean;
  size?: "normal" | "small" | "large";
  adaptive?: boolean;
};

const Player = ({ player, noNick, size = "normal", adaptive }: Props) => {
  const imageSizes = {
    normal: 24,
    small: 16,
    large: 32,
  };

  const [playerState, setPlayerState] = useState<IPlayer | null>(
    typeof player == "object" ? player : null
  );

  const fetchPlayer = async () => {
    console.log(player);
    const playerResponse = await fetch("/api/player?id=" + player);
    const playerJson: IPlayer = await playerResponse.json();
    setPlayerState(playerJson);
  };

  useEffect(() => {
    typeof player == "string" && fetchPlayer();
  }, []);

  return playerState ? (
    <div className="flex items-center gap-2 relative group/navplayer cursor-pointer">
      <Image
        alt="player head"
        width={imageSizes[size]}
        height={imageSizes[size]}
        src={`https://starlightskins.lunareclipse.studio/render/pixel/${
          playerState.skin != "null" ? playerState.name : "Steve"
        }/face${
          playerState.skin != "null"
            ? `?skinUrl=${playerState.skin}`
            : `?skinUrl=${"https://s.namemc.com/i/63455d7069b397c2.png"}`
        }`}
        className="rounded-md"
      />
      <span
        className={classNames("font-black", {
          "text-accent": playerState.plus,
          hidden: noNick,
          "sm:hidden md:block": adaptive,
        })}
      >
        {playerState.name}
      </span>
    </div>
  ) : (
    <PlayerNavSkeleton />
  );
};

export default Player;
