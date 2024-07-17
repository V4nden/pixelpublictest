import Image from "next/image";
import React from "react";

type Props = {};

const Dev = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center md:p-32 sm:p-4 lg:p-32">
      <div className="absolute left-0 top-0 w-full h-screen flex justify-center -z-10">
        <Image
          src="/sc.png"
          width={1920}
          height={1080}
          className="w-full top-0 left-0 h-full object-cover -z-10 brightness-75"
          alt=""
        />
        <div className="w-full min-h-screen absolute top-0 left-0 bg-gradient-to-t from-background via-background/0 to-background/25" />
      </div>
      <div className="font-bold text-2xl py-8">
        Страница находится в разработке
      </div>
      <Image src="/funny.gif" width={300} height={600} alt="" />
    </main>
  );
};

export default Dev;
