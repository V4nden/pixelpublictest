"use client";
import { IMessage, IThread } from "@/src/entities/Thread/model/types";
import classNames from "classnames";
import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaFile, FaLink } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageValidationSchema } from "@/src/entities/Thread/model/messageValidationSchema";
import Image from "next/image";

type Props = {
  thread: IThread;
  updateMessages: (messages: IMessage[]) => void;
};

const ThreadInput = ({ thread, updateMessages }: Props) => {
  const [loading, setLoading] = useState(false);

  const [errorsPreview, setErrorsPreview] = useState<FieldErrors<{
    content: string;
    attachments: File[];
  }> | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<{
    content: string;
    attachments: File[];
  }>({
    resolver: yupResolver(messageValidationSchema),
    defaultValues: { attachments: [], content: "" },
  });

  const changeHeightBasedOfLines = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height =
      e.currentTarget.value.split("\n").length * 24 + "px";
  };

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref: textAreaFormRef, ...contentRegisterRest } = register("content", {
    onChange: changeHeightBasedOfLines,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (loading) return;

    if (!e.currentTarget.files || !e.currentTarget.files[0]) return;

    setValue("attachments", [
      ...watch("attachments"),
      e.currentTarget.files[0],
    ]);

    e.currentTarget.value = "";
  };

  const onSubmit = (data: { content: string; attachments: File[] }) => {
    if (loading) return;

    const formData = new FormData();
    formData.append("content", data.content);

    data.attachments.forEach((attachment, index) => {
      formData.append("attachments[]", attachment);
    });

    setLoading(true);
    setErrorsPreview(null);

    fetch("/api/threads/messages?id=" + thread.id, {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      const jsonMessages: IMessage[] = await res.json();
      updateMessages(jsonMessages);

      setLoading(false);

      setValue("attachments", []);
      setValue("content", "");
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "24px";
      }
    });
  };

  const submitInputRef = useRef<HTMLInputElement>(null);

  const submitOnEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey) {
      e.preventDefault();
      submitInputRef.current?.click();
    }
  };

  const handleTextAreaPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.clipboardData.files.length && e.preventDefault();

    if (loading) return;

    if (!e.clipboardData.files[0]) return;

    setValue("attachments", [
      ...watch("attachments"),
      e.clipboardData.files[0],
    ]);
  };

  const deleteFile = (fileToDelete: File) => {
    !loading &&
      setValue(
        "attachments",
        watch("attachments").filter((file) => file != fileToDelete)
      );
  };

  const fileSizeInMb = (file: File) =>
    Math.floor((file.size / 1024 / 1024) * 100) / 100;

  const openFilePickerOnClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        setErrorsPreview(errors);
      })}
      className={classNames(
        "active border p-4 flex flex-col gap-2 transition-all duration-1000 ease-out",
        {
          skeleton: loading,
          "drop-shadow-glow": errorsPreview,
        }
      )}
    >
      <div className="relative grid md:grid-cols-1 lg:grid-cols-2 gap-2 text-xs">
        {watch("attachments").map((file, index) => {
          return (
            <div
              key={index}
              className="p-4 active border flex gap-2 items-center"
            >
              {file.type.startsWith("image") ? (
                <img
                  alt="Uploaded image preview"
                  className="w-[24px] h-[24px] object-cover"
                  src={URL.createObjectURL(file)}
                />
              ) : (
                <FaFile size={24} />
              )}

              <div className="flex flex-col gap-1 text-text/50">
                <div>{file.name}</div>
                <div>{fileSizeInMb(file)} mb</div>
                <div>{file.type}</div>
              </div>

              <div className="absolute right-0 top-0 p-4 flex items-center">
                <button
                  className="text-text/25"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteFile(file);
                  }}
                >
                  <FaX />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <textarea
        id="threadTextArea"
        readOnly={loading}
        onPaste={handleTextAreaPaste}
        onKeyDown={submitOnEnter}
        disabled={loading}
        {...contentRegisterRest}
        ref={(e) => {
          textAreaFormRef(e);
          textAreaRef.current = e;
        }}
        className="outline-none bg-text/0 w-full resize-none leading-[24px] h-[24px]"
      />
      {errorsPreview && (
        <div className="text-accent flex flex-col gap-2">
          {Object.values(errorsPreview).map((error, index) => {
            return <div key={index}>{error.message}</div>;
          })}
        </div>
      )}
      <div className="flex items-center justify-end w-full gap-2">
        <div className="flex flex-col text-[10px] w-full text-left lg:block sm:hidden">
          <div
            className={
              watch("content").length <= 1600 ? "text-text/50" : "text-accent"
            }
          >
            {watch("content").length} / 1600
          </div>
          <div className="text-text/50">
            <span className="active border py-0.5 px-2">Enter</span> для
            переноса строки, <br />{" "}
            <span className="active border py-0.5 px-2">Shift + Enter</span> для
            отправки
          </div>
        </div>
        <div className="flex sm:w-full lg:w-fit items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
          />
          <button
            onClick={openFilePickerOnClick}
            className="md:p-3 lg:p-2 md:text-base lg:text-xs text-text/50 active-no-rounded rounded-md border"
          >
            <FaLink />
          </button>
          <input
            ref={submitInputRef}
            type="submit"
            value="Отправить"
            className="px-4 py-2 active border w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default ThreadInput;
