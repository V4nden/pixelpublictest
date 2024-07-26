"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLink } from "react-icons/fa";

type Props = { code: string };

const PlayTicketCopyAndRedirect = (props: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={(e) => {
        window.navigator.clipboard.writeText(props.code);
        router.replace("https://www.donationalerts.com/r/pixelvanilla");
      }}
      className="font-bold text-primary bg-accent/15 border border-accent rounded-xl backdrop-blur-sm p-4 flex items-center gap-2"
    >
      <FaLink />
      Скопировать & Oплатить
    </button>
  );
};

export default PlayTicketCopyAndRedirect;
