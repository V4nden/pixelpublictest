import { pb } from "@/src/app/pocketbase";
import WikiNotFound from "@/src/entities/Wiki/ui/WikiNotFound";
import WikiPage from "@/src/pages/wiki/WikiPage";
import React from "react";
import Markdown from "react-markdown";

type Props = { params: { article: string } };

const Wiki = (props: Props) => {
  return <WikiPage params={props.params} />;
};

export default Wiki;
