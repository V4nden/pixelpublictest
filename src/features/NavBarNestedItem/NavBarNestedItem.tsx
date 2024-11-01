import Link from "next/link";
import React, { ReactNode } from "react";
import { IconType } from "react-icons/lib";

type Props = {
  icon: IconType;
  title: string;
  description: string;
  to?: string;
};

const NavBarNestedItem = ({ description, icon, title, to }: Props) => {
  const IconElement = icon;
  return (
    <Link
      href={to ? to : "/not-found"}
      className="flex gap-2 items-center group/nestednav active:drop-shadow-glow"
    >
      <IconElement className="group-hover/nestednav:w-4 group-hover/nestednav:opacity-100 w-0 opacity-0 duration-300 transition-all ease-out" />
      <div className="flex flex-col gap-1">
        <h2 className="font-black">{title}</h2>
        <h3 className="text-text/50 text-xs">{description}</h3>
      </div>
    </Link>
  );
};

export default NavBarNestedItem;
