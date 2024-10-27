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
                className="bg-background/25 backdrop-blur-sm border border-primary/25 p-2 rounded-lg"
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
          Подробнее
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
        <Markdown className={"markdown text-left"}>
          {`**Что если я не могу использовать DonationAlerts?**

Вы можете оплатить заявку на наш [DontePay](https://new.donatepay.ru/@pixelmc)

## Что дальше?
После оплаты и рассмотрения вашей заявки вам придёт сообщение в дискорд от нашего бота с данными для игры 
`}
        </Markdown>
        <Image
          src={"/ds.png"}
          width={1920}
          height={1080}
          alt="Discord message"
        />
        <Markdown className={"markdown text-left"}>
          {`# Внимание!
          
Убедитесь, что вы принимаете сообщения в личные сообщения дискорда от сторонних приложений, также удостоверьтесь, что вы находитесь и не вышли с дискорд сервера до рассмотрения заявки. В ином случае, мы не сможем оповестить вас о рассмотрении вашей заявки

В силу особенностей авторизации и игрового процесса мы не сможем рассмотреть вашу заявку если вы вышли с нашего дискорда. 

# Ещё вопросы?

Вы всегда можете задать вопрос / уточнить детали у администрации в [телеграме](https://t.me/connectsomnoi) для уточнения деталий покупки проходки и процедуры принятия вашей заявки`}
        </Markdown>
      </Popup>
    </>
  );
};

export default PlayTicketCode;
