import classNames from "classnames";
import Link from "next/link";
import React, { ReactNode } from "react";
import { IconType } from "react-icons/lib";

type Props = {
  icon: IconType;
  title: string;
  description: string;
  to?: string;
  visible?: boolean;
};

const NavigationItem = ({ description, icon, title, to, visible }: Props) => {
  const IconElement = icon;
  return (
    <Link
      href={to ? to : "/not-found"}
      className="flex gap-2 items-center group/nestednav active:drop-shadow-glow"
    >
      <IconElement
        className={classNames(
          "duration-300 transition-all ease-out",
          { "w-4 opacity-100 active:drop-shadow-glow": visible },
          {
            "group-hover/nestednav:w-4 group-hover/nestednav:opacity-100 w-0 opacity-0":
              !visible,
          }
        )}
      />
      <div className="flex flex-col gap-1">
        <h2 className="font-black">{title}</h2>
        <h3 className="text-text/50 text-xs">{description}</h3>
      </div>
    </Link>
  );
};

export default NavigationItem;
