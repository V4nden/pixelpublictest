import { pb } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";
import { IThread, IThreadExpandable } from "../model/types";

export default async function getThreadsPublic(
  expand?: IThreadExpandable[],
  filter?: string
): Promise<IThread[]> {
  return await pb.collection("threads").getFullList({
    filter: `private=false${filter ? `&&${filter}` : ""}`,
    sort: "-updated",
    headers: { key: String(process.env.POCKETBASE_KEY) },
    expand: expand && expand.join(","),
  });
}
