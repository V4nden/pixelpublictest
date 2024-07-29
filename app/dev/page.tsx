import VignettedImage from "@/src/shared/VignettedImage";
import Image from "next/image";
import React from "react";

type Props = {};

const Dev = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <VignettedImage src="/sc.png" />
      <div className="font-bold text-2xl py-8">
        Страница находится в разработке
      </div>
      <Image src="/funny.gif" width={300} height={600} alt="" />
    </main>
  );
};

export default Dev;
