"use client";
import useTextInputSimulation from "@/src/features/TextInputSimulation/hooks/useTextInputSimulation";
import { minecraftFont } from "@/src/shared/utils/fonts/MinecraftFont";
import VignettedImage from "@/src/shared/VignettedImage";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";

type Props = {};

const NotAllowedPage = (props: Props) => {
  const text = useTextInputSimulation("not-allowed", 500);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 py-20">
      <VignettedImage
        src="/night.png"
        className="fixed brightness-50 blur-sm"
      />
      <h1 className={minecraftFont.className + " text-4xl drop-shadow-glow"}>
        /{text}
      </h1>
      <div className="text-text/50">У вас нет доступа к этой странице</div>
      <Link
        href={"/"}
        className="active border p-2 px-4 flex items-center gap-2 font-bold text-text/75"
      >
        На главную <FaHome />
      </Link>
    </main>
  );
};

export default NotAllowedPage;
