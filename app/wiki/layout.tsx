import VignettedImage from "@/src/shared/VignettedImage";
import { pb } from "@/src/app/pocketbase";
import WikiSidebar from "@/src/entities/Wiki/ui/WikiSidebar";
import { IWikiArticle } from "@/src/entities/Wiki/model/types";
import getWikiArticles from "@/src/entities/Wiki/api/getWikiArticles";

export const revalidate = 1;
export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articles = await getWikiArticles();
  return (
    <>
      <main className="sm:flex-col md:flex-row flex min-h-screen gap-8 py-20">
        <VignettedImage
          src="/kostya.webp"
          className="fixed brightness-50 blur-sm"
        />
        <WikiSidebar articles={articles} />
        {children}
      </main>
    </>
  );
}
