"use client";
import { IPlayer } from "@/src/utils/types";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import { FaClock, FaPlus, FaSkull, FaUser } from "react-icons/fa";
import { FaHand } from "react-icons/fa6";

type Props = { player: IPlayer };

const Player = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-backgroundprimary/25 w-fit p-2 flex gap-2 rounded-xl backdrop-blur-sm"
    >
      <div className="flex gap-2 items-center">
        <Image
          alt="player head"
          width={24}
          height={24}
          src={`https://starlightskins.lunareclipse.studio/render/pixel/${
            props.player.skin != "null" ? props.player.name : "Steve"
          }/face${
            props.player.skin != "null"
              ? `?skinUrl=${props.player.skin}`
              : `?skinUrl=${"https://s.namemc.com/i/63455d7069b397c2.png"}`
          }`}
        ></Image>
        <p
          className={`font-bold ${
            props.player.plus &&
            "bg-clip-text bg-gradient-to-r from-primary to-accent text-text/0"
          }`}
        >
          {props.player.name}
        </p>
      </div>
    </motion.div>
  );
};

export default Player;
