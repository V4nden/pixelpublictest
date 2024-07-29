"use client";
import { IWikiArticle } from "@/src/utils/types";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";

type Props = { records: IWikiArticle[] };

const WikiSidebar = (props: Props) => {
  const [current, setCurrent] = useState("about");
  useEffect(() => {
    setCurrent(window.location.href);
  }, []);

  return (
    <aside className="sm:text-center md:text-left flex flex-col gap-4 md:sticky sm:relative md:top-20 h-fit">
      {props.records
        .reduce<string[]>((acc, el) => {
          return acc.includes(el.category) ? [...acc] : [...acc, el.category];
        }, [])
        .map((el: string, index) => {
          return (
            <div key={index}>
              <h1 className="font-extrabold text-xl pb-2">{el}</h1>
              <div className="pl-2 flex gap-2 md:flex-col flex-wrap justify-center">
                {props.records
                  .filter((el1) => el1.category == el)
                  .map((el, index2) => {
                    return (
                      <Link
                        key={index2}
                        onClick={(e) => {
                          setCurrent(el.article);
                        }}
                        className={`transition-all ease-out ${
                          current.endsWith(el.article)
                            ? "text-text"
                            : "text-text/75"
                        }`}
                        href={el.article}
                      >
                        {el.title}
                        <div
                          className={`h-0.5 transition-all bg-primary/50 ${
                            current.endsWith(el.article) ? "w-full" : "w-0"
                          }`}
                        ></div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </aside>
  );
};

export default WikiSidebar;