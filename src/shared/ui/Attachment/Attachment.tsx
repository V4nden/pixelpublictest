"use client";
import { useState } from "react";
import Popup from "../Popup/Popup";
import { FaFile } from "react-icons/fa";
import Image from "next/image";

type Props = { record: string; collection: string; file: string };

const Attachment = (props: Props) => {
  let isImage =
    props.file.endsWith(".png") ||
    props.file.endsWith(".jpg") ||
    props.file.endsWith(".webp");
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Popup
        title={`${props.collection}/${props.file}`}
        state={{ current: opened, action: setOpened }}
      >
        <img
          src={`/api/attachment/${props.collection}/${props.record}/${props.file}`}
          className="w-full rounded-md"
          alt="image file preview"
        />
      </Popup>
      <div
        onClick={(e) => {
          window && isImage
            ? setOpened(true)
            : window.location.replace(
                `/api/attachment/${props.collection}/${props.record}/${props.file}`
              );
        }}
        className="active border p-4 flex items-center gap-2 cursor-pointer"
      >
        {isImage ? (
          <img
            src={`/api/attachment/${props.collection}/${props.record}/${props.file}?thumb=100x100`}
            className="w-8 rounded-md"
            alt="image file preview"
          />
        ) : (
          <FaFile size={24} />
        )}
        {props.file}
      </div>
    </>
  );
};

export default Attachment;
