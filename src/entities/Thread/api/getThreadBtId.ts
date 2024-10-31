import { pb } from "@/src/app/pocketbase";
import { IThread, IThreadExpandable } from "../model/types";

export async function getThreadById(
  id: string,
  expand?: IThreadExpandable[]
): Promise<IThread | null> {
  try {
    return await pb.collection("threads").getOne(id, {
      expand: expand && expand.join(","),
      headers: { key: String(process.env.POCKETBASE_KEY) },
    });
  } catch (ClientResponseError) {
    return null;
  }
}
