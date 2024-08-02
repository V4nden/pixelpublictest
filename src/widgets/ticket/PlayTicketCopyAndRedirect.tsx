"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLink } from "react-icons/fa";

type Props = { code: string; price: number };

const PlayTicketCopyAndRedirect = (props: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={(e) => {
        window.navigator.clipboard.writeText(props.code);
        router.replace("https://www.donationalerts.com/r/pixelvanilla");
      }}
      className="font-bold border border-accent rounded-xl backdrop-blur-sm flex items-center"
    >
      <div className="flex gap-2 text-primary bg-accent/15 p-4 items-center">
        <FaLink />
        Скопировать & Oплатить
      </div>
      <div className="px-4 font-nold bg-gradient-to-tr from-accent to-primary text-text/0 bg-clip-text text-lg">
        <p>{props.price}₽</p>
      </div>
    </button>
  );
};

export default PlayTicketCopyAndRedirect;
