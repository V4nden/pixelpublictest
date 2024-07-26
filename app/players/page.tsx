import PlayersPage from "@/src/pages/players/PlayersPage";
import Player from "@/src/shared/Player/Player";
import { pb } from "@/src/utils/pocketbase";
import { IPlayer } from "@/src/utils/types";
import React from "react";

type Props = {};

const Players = async (props: Props) => {
  const records: IPlayer[] = await pb.collection("players").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    sort: "-updated",
  });
  return <PlayersPage players={records} />;
};

export default Players;
