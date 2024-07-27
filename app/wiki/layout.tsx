import { pb } from "@/src/utils/pocketbase";
import { IWikiArticle } from "@/src/utils/types";
import WikiSidebar from "@/src/widgets/wiki/WikiSidebar";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const revalidate = 1;
export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const records: IWikiArticle[] = await pb.collection("wiki").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    $autoCancel: false,
  });
  return (
    <>
      <main className="sm:flex-col md:flex-row flex min-h-screen gap-8 sm:px-4 md:px-32 lg:px-64 py-20">
        <WikiSidebar records={records} />
        {children}
      </main>
    </>
  );
}
