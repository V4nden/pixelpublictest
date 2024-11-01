import { pb } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";
import { IThread, IThreadExpandable } from "../model/types";

export default async function getThreadsPublic(
  expand?: IThreadExpandable[]
): Promise<IThread[]> {
  return await pb.collection("threads").getFullList({
    filter: `private=false`,
    headers: { key: String(process.env.POCKETBASE_KEY) },
    expand: expand && expand.join(","),
  });
}
