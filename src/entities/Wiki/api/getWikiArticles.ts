import { pb } from "@/src/app/pocketbase";

export async function getWikiArticles(article: string) {
  return await pb.collection("wiki").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    filter: 'article = "' + article + '"',
    $autoCancel: false,
  });
}
