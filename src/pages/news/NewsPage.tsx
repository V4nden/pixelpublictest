"use client";
import { INewsPost } from "@/src/entities/News/model/types";
import VignettedImage from "@/src/shared/VignettedImage";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

type Props = {};

const NewsPage = (props: Props) => {
  //TODO: USEFETCH HOOK
  const [data, setData] = useState<INewsPost[] | null>(null);
  useEffect(() => {
    fetch("/api/posts/news").then(async (data) => {
      setData(await data.json());
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-4 my-20">
      <VignettedImage src="/sc.png" className="fixed" />
      {data &&
        data.map((post) => {
          return (
            <div key={post.id} className="active border sm:p-4 md:p-8">
              <div>
                <div className="flex gap-2 items-center flex-wrap">
                  <h1 className="text-xl font-bold">{post.title}</h1>
                  <span className="text-text/50 text-sm">{post.created}</span>
                </div>
                <Markdown className={"markdown whitespace-pre-wrap"}>
                  {post.content}
                </Markdown>
              </div>
            </div>
          );
        })}
    </main>
  );
};

export default NewsPage;
