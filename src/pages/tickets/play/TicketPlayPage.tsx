"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FaExclamation } from "react-icons/fa";

import { useEffect, useState } from "react";
import { Router } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Link from "next/link";

type Props = {};

const TicketPlayPage = (props: Props) => {
  useEffect(() => {
    console.log(session.data);
    return () => {};
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    return () => {};
  }, [session]);
  //@ts-ignore
  const submit = (data) => {
    if (session.status == "unauthenticated") {
      signIn("discord");
      return;
    }
    toast("Заявка в обработке", { type: "info" });
    fetch("/api/ticket", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      //@ts-ignore
      body: JSON.stringify({ ...data, id: session.data.user.did }),
    }).then(async (res) => {
      const resb = await res.json();
      if (resb.error) {
        if (resb.error == "already") {
          router.push("/ticket/" + resb.id);
          return;
        } else if (resb.error == "name") {
          toast("Игрок с таким ником уже играет на севрере", { type: "error" });
          return;
        } else if (resb.error == "promo") {
          toast("Такого промокода несуществует", { type: "error" });
          return;
        } else if (resb.error == "discord") {
          toast(
            "Ваша заявка уже рассмотренна. Проверьте ЛС с ботом в дискорде",
            { type: "error" }
          );
          return;
        } else if (resb.error == "unauthorized") {
          signIn("discord");
          return;
        } else {
          router.push("/error/unauthorized/");
          return;
        }
      }
      router.push("/ticket/" + resb.id);
    });
  };
  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <div className="absolute left-0 top-0 w-full h-screen flex justify-center">
        <Image
          src="/sc.png"
          width={1920}
          height={1080}
          className="w-full top-0 left-0 h-full object-cover -z-10 brightness-75"
          alt=""
        />
        <div className="w-full min-h-screen absolute top-0 left-0 bg-gradient-to-t from-background via-background/0 to-background/25" />
      </div>
      <div className="min-h-screen relative grid sm:mt-16 md:mt-0 sm:grid-cols-1 md:grid-cols-2 justify-center place-items-center gap-4 ">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-4 p-4 bg-background/25 rounded-xl backdrop-blur-sm"
          >
            <h1 className="text-stone-200 py-6 font-bold text-4xl text-center">
              Заявка на сервер
            </h1>
            <input
              placeholder="Никнейм"
              {...register("nickname", {
                required: { value: true, message: "Поле никнейма обязательно" },
                minLength: {
                  value: 5,
                  message: "Минимальная длинна ника - 5 символов",
                },
                maxLength: {
                  value: 16,
                  message: "Максимальная длинна ника - 16 символов",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "В качестве ника допускаются только символы анг. алфавита, нижнее подчеркивание и цифры.",
                },
              })}
              className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none"
            />
            <input
              placeholder="Пароль"
              {...register("password", {
                required: { value: true, message: "Поле пароля обязательно" },
                minLength: {
                  value: 5,
                  message: "Минимальная длинна пароля - 5 символов",
                },
                maxLength: {
                  value: 24,
                  message: "Максимальная длинна пароля - 24 символа",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "В качестве пароля допускаются только символы анг. алфавита, нижнее подчеркивание и цифры.",
                },
              })}
              className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none"
            />
            <input
              placeholder="Возраст"
              {...register("age", {
                required: { value: true, message: "Поле возраста обязательно" },
                maxLength: {
                  value: 2,
                  message: "Максимальная длинна возраста - 2 символа",
                },
              })}
              className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none"
            />
            <input
              placeholder="Узнали о нас"
              {...register("wherefrom", {
                required: false,
                maxLength: {
                  value: 64,
                  message:
                    "Максимальная длинна откуда вы о нас узнали - 64 символа",
                },
              })}
              className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none"
            />
            <input
              placeholder="Промокод"
              {...register("promo", {
                required: false,
                maxLength: {
                  value: 16,
                  message: "Максимальная длинна промокада - 16 символов",
                },
              })}
              className="bg-background/25 p-2 rounded-xl backdrop-blur-sm outline-none"
            />
            {errors && (
              <div className="text-sm text-primary font-bold flex flex-col gap-2">
                {Object.values(errors).map((error, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 flex items-center gap-2 bg-background/25 rounded-xl"
                    >
                      <FaExclamation />
                      {String(error?.message)}
                    </div>
                  );
                })}
              </div>
            )}
            <input
              type="submit"
              className="bg-accent font-bold shadow-md rounded-full p-2 transition-all hover:scale-[101%] active:scale-95"
              value="Оставить заявку"
            />
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-background/25 rounded-xl backdrop-blur-sm border-accent border flex gap-4 items-center p-4">
            <FaExclamation size={24} />
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Внимание</h1>
              <p>
                Вводите пароль для игры на сервере, а не от вашего лицензионного
                аккаунта
              </p>
              <p className="text-sm text-text/50">
                (если вы играете с лицензии)
              </p>
            </div>
          </div>
          <div className="bg-background/25 rounded-xl backdrop-blur-sm border-accent border flex gap-4 items-center p-4">
            <FaExclamation size={24} />
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold">Внимание</h1>
              <p>
                После подачи заявки не выходите из нашего дискорд севрера, иначе
                вы можете потерять средства без возможности возврата
              </p>
              <Link
                href={"https://discord.gg/6uf5ZStHP5"}
                className="text-sm text-text/50"
              >
                Discord (кликабельно)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TicketPlayPage;
