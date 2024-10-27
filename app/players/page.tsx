import PlayersPage from "@/src/pages/players/PlayersPage";
import Player from "@/src/entities/Player/ui/Player";
import { pb } from "@/src/app/pocketbase";
import React from "react";
import { IPlayer } from "@/src/entities/Player/model/types";

type Props = {};

// TODO: FSD REWORK

const Players = async (props: Props) => {
  const records: IPlayer[] = await pb.collection("players").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    sort: "-updated",
    $autoCancel: false,
  });
  return <PlayersPage players={records} />;
};

export default Players;
