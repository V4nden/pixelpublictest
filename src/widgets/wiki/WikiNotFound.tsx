import Link from "next/link";
import React from "react";

type Props = {};

const WikiNotFound = (props: Props) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-2xl font-extrabold">Статья не найдена</h1>
      <Link href={"/"}>На главную</Link>
    </div>
  );
};

export default WikiNotFound;
