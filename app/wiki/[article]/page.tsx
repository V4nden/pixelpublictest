import { pb } from "@/src/utils/pocketbase";
import WikiNotFound from "@/src/widgets/wiki/WikiNotFound";
import React from "react";
import Markdown from "react-markdown";

type Props = { params: { article: string } };

const Wiki = async (props: Props) => {
  const [record] = await pb.collection("wiki").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    filter: 'article = "' + props.params.article + '"',
    $autoCancel: false,
  });
  return record ? (
    <div>
      <div className="flex items-center flex-wrap gap-2 pb-2">
        <h1 className="text-3xl font-extrabold text-text">{record.title}</h1>
        {record.content.split("\n").map((el: string, index: number) => {
          if (el.startsWith("# "))
            return (
              <span
                key={index}
                className="text-sm text-primary/75 font-bold bg-secondary/25 p-1 px-2 rounded-xl"
              >
                {el.replace("# ", "")}
              </span>
            );
        })}
      </div>
      <Markdown className={"markdown"}>{record.content}</Markdown>
    </div>
  ) : (
    <WikiNotFound />
  );
};

export default Wiki;
