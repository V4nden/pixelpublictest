import React from "react";
import { IPlayer } from "../model/types";
import Image from "next/image";
import classNames from "classnames";

type Props = {
  player: IPlayer;
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
  return (
    <div className="flex items-center gap-2 relative group/navplayer cursor-pointer">
      <Image
        alt="player head"
        width={imageSizes[size]}
        height={imageSizes[size]}
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
        className={classNames("font-black", {
          "text-accent": player.plus,
          hidden: noNick,
          "sm:hidden md:block": adaptive,
        })}
      >
        {player.name}
      </span>
    </div>
  );
};

export default Player;
