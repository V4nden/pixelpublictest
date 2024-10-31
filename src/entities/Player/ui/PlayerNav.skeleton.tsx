import React from "react";

type Props = {};

const PlayerNavSkeleton = (props: Props) => {
  return (
    <div className="flex items-center gap-2 relative group/navplayer cursor-pointer">
      <div className="w-[24px] h-[24px] rounded-md skeleton"></div>
      <span className="w-[64px] h-[16px] sm:hidden md:block rounded-md skeleton"></span>
    </div>
  );
};

export default PlayerNavSkeleton;
