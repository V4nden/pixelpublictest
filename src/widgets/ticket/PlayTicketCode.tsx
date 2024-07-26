"use client";
import Popup from "@/src/shared/ui/Popup/Popup";
import Image from "next/image";
import React, { useState } from "react";
import Markdown from "react-markdown";

type Props = { phrase: string };

const PlayTicketCode = (props: Props) => {
  const [popup, setPopup] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="gap-2 grid grid-cols-5">
          {props.phrase.split(" ").map((el: string, index: number) => {
            return (
              <span
                key={index}
                className="bg-background/25 backdrop-blur-sm border border-accent p-2 rounded-xl"
              >
                {el}
              </span>
            );
          })}
        </div>
        <button
          onClick={() => [setPopup(true)]}
          className="text-sm text-text/50"
        >
          Что за слова?
        </button>
      </div>

      <Popup
        state={{ action: setPopup, current: popup }}
        title="Что это за слова?"
      >
        <Markdown className={"markdown text-left"}>
          {`**Это кодовая фраза, использующаяся для оплаты вашей заявки**

После подачи заявки, вставьте фразу в комментарий к донату`}
        </Markdown>
        <Image src={"/d.png"} width={1920} height={1080} alt="Donatuin" />
      </Popup>
    </>
  );
};

export default PlayTicketCode;
