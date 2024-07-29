"use client";
import Player from "@/src/shared/Player/Player";
import { IPlayer } from "@/src/utils/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = { players: IPlayer[] };

const PlayersPage = (props: Props) => {
  const [filter, setFilter] = useState("");
  return (
    <main className="flex min-h-screen flex-col gap-10 py-16">
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.currentTarget.value);
        }}
        className="sticky top-20 bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none z-10 border border-accent/25"
      ></input>
      <motion.div layoutRoot className="flex gap-2 flex-wrap justify-center">
        {props.players &&
          props.players
            .filter((el) => {
              return el.name.includes(filter);
            })
            .sort((a, b) => {
              return parseInt(b.played) - parseInt(a.played);
            })
            .map((player, index) => {
              return <Player key={index} player={player} />;
            })}
      </motion.div>
    </main>
  );
};

export default PlayersPage;
