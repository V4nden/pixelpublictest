import { getWikiArticlesByTitle } from "@/src/entities/Wiki/api/getWikiArticlesByTitle";
import WikiNotFound from "@/src/entities/Wiki/ui/WikiNotFound";
import WikiPage from "@/src/pages/wiki/WikiPage";
import React from "react";

type Props = { params: { article: string } };

const Wiki = async (props: Props) => {
  const [record] = await getWikiArticlesByTitle(props.params.article);
  if (!record) return <WikiNotFound />;

  return <WikiPage article={record} />;
};

export default Wiki;
