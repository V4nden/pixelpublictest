import VignettedImage from "@/src/shared/VignettedImage";
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
      <main className="sm:flex-col md:flex-row flex min-h-screen gap-8 py-20">
        <VignettedImage
          src="/kostya.webp"
          className="fixed brightness-50 blur-sm"
        />
        <WikiSidebar records={records} />
        {children}
      </main>
    </>
  );
}
