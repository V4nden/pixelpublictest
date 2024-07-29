import Link from "next/link";
import React from "react";
import {
  FaDiscord,
  FaTelegram,
  FaTelegramPlane,
  FaVk,
  FaYoutube,
} from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="text-sm text-text/60 py-8 border-t border-backgroundprimary">
      <div className="m-auto sm:w-[95%] md:w-[75%] lg:w-[65%] max-w-[1600px] flex sm:flex-col md:flex-row justify-between">
        <div>
          <p>
            Вся размещенная информация на сайте не является публичной офертой.
          </p>
          <p className="font-bold">
            We are in no way affiliated with or endorsed by Mojang, AB.
          </p>
          <p className="text-text/20">© Copyright by PIXEL</p>
        </div>

        <div className="flex items-center gap-4 text-xl text-[#fff]">
          <Link
            href={"https://t.me/pixelvanilla"}
            className="bg-[#24A1DE] rounded-xl p-2"
          >
            <FaTelegramPlane />
          </Link>
          <Link
            href={"https://discord.gg/mdUqm9dKbE"}
            className="bg-[#7289da] rounded-xl p-2"
          >
            <FaDiscord />
          </Link>
          <Link
            href={"https://www.youtube.com/channel/UCDxpxE7YG5dz1e2VZoekDow"}
            className="bg-[#f00] rounded-xl p-2"
          >
            <FaYoutube />
          </Link>
          <Link
            href={"https://vk.com/pixelvanilla"}
            className="bg-[#0077FF] rounded-xl p-2"
          >
            <FaVk />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
