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
    <div className="flex flex-col gap-4">
      <div className="py-8 bg-background/25 backdrop-blur-sm border border-primary/25 rounded-xl text-center">
        <div className="flex items-center justify-center">
          <div className="h-0.5 w-full bg-text/25" />
          <h1 className="text-3xl font-extrabold text-text px-8 whitespace-nowrap">
            {record.title}
          </h1>
          <div className="h-0.5 w-full bg-text/25" />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {record.content.split("\n").map((el: string, index: number) => {
            if (el.startsWith("# "))
              return (
                <span
                  key={index}
                  className="text-[10px] text-text/50 p-1 font-bold"
                >
                  {el.replace("# ", "")}
                </span>
              );
          })}
        </div>
      </div>
      <Markdown className={"markdown"}>{record.content}</Markdown>
    </div>
  ) : (
    <WikiNotFound />
  );
};

export default Wiki;
