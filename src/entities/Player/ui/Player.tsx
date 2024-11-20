"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IPlayer } from "../model/types";
import Image from "next/image";
import classNames from "classnames";
import PlayerNavSkeleton from "./PlayerNav.skeleton";

type PlayerProps = {
  player: IPlayer | string;
  noNick?: boolean;
  headPos?: "left" | "right";
  size?: "normal" | "small" | "large";
  adaptive?: boolean;
};

const Player = React.memo(
  ({
    player,
    headPos = "left",
    noNick,
    size = "normal",
    adaptive,
  }: PlayerProps) => {
    const imageSizes = {
      normal: 24,
      small: 16,
      large: 32,
    };

    const [playerState, setPlayerState] = useState<IPlayer | null>(
      typeof player == "object" ? player : null
    );

    const fetchPlayer = useCallback(async () => {
      if (typeof player != "string") return;
      const playerResponse = await fetch("/api/players?id=" + player);
      const playerJson: IPlayer = await playerResponse.json();
      setPlayerState(playerJson);
    }, [player]);

    useEffect(() => {
      fetchPlayer();
    }, []);

    return playerState ? (
      <div
        className={classNames(
          "flex items-center gap-2 relative group/navplayer cursor-pointer",
          { "flex-row-reverse": headPos == "right" }
        )}
      >
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
  }
);

Player.displayName = "Player";

export default Player;
