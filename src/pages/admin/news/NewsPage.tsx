"use client";
import VignettedImage from "@/src/shared/VignettedImage";
import Popup from "@/src/shared/ui/Popup/Popup";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";

const NewsPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [popupState, setPopupState] = useState(false);
  const submit = (data: { title: string; image: string; content: string }) => {
    setPopupState(true);
  };
  return (
    <main className="min-h-screen flex justify-center items-center">
      <VignettedImage src="/sc.png" />
      <div className="flex flex-col gap-2 items-center justify-center w-1/2">
        <h1 className="text-2xl font-bold">Создать новость</h1>
        <form
          //@ts-ignore
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-2 w-full"
        >
          <input
            placeholder="Заголовок"
            {...register("title", {
              required: { value: true, message: "Поле заголовка обязательно" },
            })}
            className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none"
          />
          <textarea
            placeholder="Сообщение"
            {...register("content", {
              required: { value: true, message: "Поле сообщения обязательно" },
            })}
            className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none resize-none h-[400px]"
          />
          <input
            placeholder="Картинка"
            {...register("image", {
              required: { value: true, message: "Поле картинки обязательно" },
            })}
            className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none"
          />
          <input
            type="submit"
            className="bg-accent font-bold shadow-md rounded-full p-2 transition-all hover:scale-[101%] active:scale-95"
            value="Пост"
          />
        </form>
      </div>
      <Popup
        state={{ action: setPopupState, current: popupState }}
        title="Проверка правильности"
      >
        <Markdown className={"markdown whitespace-pre-wrap"}>{`# ${watch(
          "title"
        )}

        ${watch("content")}
        `}</Markdown>
        <Image
          width={1000}
          height={1000}
          alt="image"
          src={watch("image")}
          className="w-80"
        />
        <button
          onClick={(e) => {
            fetch("/api/news", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                image: watch("image"),
                content: watch("content"),
                title: watch("title"),
              }),
            });
          }}
          className="w-full p-4 bg-accent rounded-xl text-xl font-bold"
        >
          Пост
        </button>
      </Popup>
    </main>
  );
};

export default NewsPage;
