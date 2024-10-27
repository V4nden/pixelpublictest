import { pb } from "@/src/app/pocketbase";
import { IWikiArticle } from "../model/types";

export async function getWikiArticlesByTitle(
  article: string
): Promise<IWikiArticle[]> {
  return await pb.collection("wiki").getFullList({
    filter: 'article = "' + article + '"',
  });
}
