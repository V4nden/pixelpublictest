import { pb } from "@/src/app/pocketbase";
import { IWikiArticle } from "../model/types";

export default async function getWikiArticles(): Promise<IWikiArticle[]> {
  return await pb.collection("wiki").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
  });
}
