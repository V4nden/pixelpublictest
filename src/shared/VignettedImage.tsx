import Image from "next/image";
import React from "react";

type Props = { src: string };

const VignettedImage = (props: Props) => {
  return (
    <div className="absolute left-0 top-0 w-full h-screen flex justify-center -z-10">
      <Image
        src={props.src}
        width={1920}
        height={1080}
        className="w-full top-0 left-0 h-full object-cover -z-10 brightness-75"
        alt=""
      />
      <div className="w-full min-h-screen absolute top-0 left-0 bg-gradient-to-t from-background via-background/0 to-background/25" />
    </div>
  );
};

export default VignettedImage;
