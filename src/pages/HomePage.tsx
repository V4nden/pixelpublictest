import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaDiscord,
  FaDonate,
  FaTelegram,
  FaVk,
  FaYoutube,
} from "react-icons/fa";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col sm:px-4 md:px-32 lg:px-64">
      <div className="absolute left-0 top-0 w-full h-screen">
        <Image
          width={1920}
          height={1080}
          src="/bg2.png"
          className="w-full top-0 left-0 h-full object-cover -z-10 brightness-75"
          alt=""
        />
        <div className="w-full min-h-screen absolute top-0 left-0 bg-gradient-to-t from-background via-background/0 to-background/25" />
      </div>
      <div className="min-h-screen relative flex flex-col sm:text-center md:text-left justify-center sm:w-full md:w-[60%] ">
        {/* <div className="flex flex-col gap-4 bg-background/25 backdrop-blur-sm p-8 rounded-xl">
          <h1 className="font-bold text-3xl">Лучший ванильный сервер</h1>
          <div className="font-semibold text-text/85">
            Pixel - площадка для творчества и полноценное комьюнити. Для входа
            не нужна лицензия.
          </div>
          <div className="text-sm text-text/85">
            У нас нет приватов, донатов и гриферов.
          </div>
          <p>На сервере есть уникальные фишки, такие как:</p>
          <ul className="list-disc pl-4">
            <li>Система репутации</li>
            <li>Система поселений</li>
            <li>Установка ресурспаков через таблички</li>
            <li>РП команды</li>
            <li>Кроссплатформенность</li>
            <li>И многое другое</li>
          </ul>
          С нами ты точно не заскучаешь и сможешь реализовать свои самые смелые
          фантазии, подавай заявку прямо сейчас и играй на Pixel!
          <div className="flex justify-evenly">
            <Link href={"https://t,me/pixelvanilla"}>
              <FaTelegram size={24} />
            </Link>
            <Link href={"https://discord.gg/6uf5ZStHP5"}>
              <FaDiscord size={24} />
            </Link>
            <Link href={"https://www.youtube.com/@PixelVanilla"}>
              <FaYoutube size={24} />
            </Link>
            <Link href={"https://vk.com/pixelvanilla"}>
              <FaVk size={24} />
            </Link>
          </div>
        </div> */}

        <h1 className="text-stone-200 py-6 font-bold text-4xl">
          Добро пожаловать на Pixel
        </h1>
        <p className="text-stone-300">
          Pixel - ванильный майнкрафт сервер. Это место для того, чтобы найти
          новых друзей и провести время с удовольствием! Наша цель - создание
          доступного и удобного пространства для взаимодействия игроков. Мы не
          изменяем механики игры, все установленные плагины лишь упрощают или
          дополняют процесс взаимодействия между людьми.
        </p>
        <div className="text-stone-300 sm:flex-col flex md:flex-row justify-around gap-4 py-8 text-center">
          <Link
            href={"/ticket"}
            className="bg-background/25 backdrop-blur-sm rounded-xl w-full p-2 "
          >
            Играть
          </Link>
          <Link
            href={"https://discord.gg/6uf5ZStHP5"}
            className="bg-background/25 backdrop-blur-sm rounded-xl w-full p-2 "
          >
            Discord
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
