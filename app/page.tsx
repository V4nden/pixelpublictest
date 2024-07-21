import { pb } from "@/src/utils/pocketbase";
import HomePageStatsWidget from "@/src/widgets/HomePageStatsWidget";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const players = await pb.collection("players").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    $autoCancel: false,
  });
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
      <div className="min-h-screen relative flex flex-col sm:text-center md:text-left justify-center sm:w-full md:w-[60%]">
        <h1 className="text-stone-200 py-6 font-bold text-4xl">
          Добро пожаловать на Pixel
        </h1>
        <p className="text-stone-300">
          Pixel - ванильный майнкрафт сервер. Это место для того, чтобы найти
          новых друзей и провести время с удовольствием! Наша цель - создание
          доступного и удобного пространства для взаимодействия игроков.
        </p>
        <p className="text-stone-300 mt-2">
          Мы не изменяем механики игры, все установленные плагины лишь упрощают
          или дополняют процесс взаимодействия между людьми.
        </p>
        <div className="text-stone-300 sm:flex-col flex md:flex-row justify-around gap-4 py-8 text-center">
          <Link
            href={"/ticket"}
            className="bg-background/25 backdrop-blur-sm rounded-xl w-full p-2 "
          >
            Оставить заявку
          </Link>
          <Link
            href={"https://discord.gg/6uf5ZStHP5"}
            className="bg-background/25 backdrop-blur-sm rounded-xl w-full p-2 "
          >
            Discord
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <HomePageStatsWidget
          players={players.length}
          hours={
            Math.round(
              (players.reduce((acc, el) => {
                return acc + parseInt(el.played);
              }, 0) /
                60) *
                100
            ) / 100
          }
        />
      </div>
    </main>
  );
}
export const revalidate = 1;
