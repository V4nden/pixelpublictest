"use client";
import { motion } from "framer-motion";
import React from "react";
import CountUp from "react-countup";

type Props = { players: number; hours: number };

const HomePageStatsWidget = (props: Props) => {
  const blockanim = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className="grid grid-cols-3 gap-4 w-full place-content-center text-center"
    >
      <motion.div
        {...blockanim}
        transition={{ delay: 0.1, ease: [0, 1, 0, 1], duration: 3 }}
        className="py-8"
      >
        <h1 className="text-4xl font-extrabold">
          <CountUp duration={3} end={props.hours} />
        </h1>
        <h2 className="text-xl font-bold text-text/85">Часов</h2>
        <p className="text-sm text-text/75">Игроки наиграли на севрере.</p>
      </motion.div>
      <motion.div
        {...blockanim}
        transition={{ delay: 0.4, ease: [0, 1, 0, 1], duration: 3 }}
        className="py-8"
      >
        <h1 className="text-4xl font-extrabold">
          <CountUp duration={3} end={props.players} />
        </h1>
        <h2 className="text-xl font-bold text-text/85">Игроков</h2>
        <p className="text-sm text-text/75">Играют на севрере.</p>
      </motion.div>
      <motion.div
        {...blockanim}
        transition={{ delay: 0.9, ease: [0, 1, 0, 1], duration: 3 }}
        className="py-8"
      >
        <h1 className="text-4xl font-extrabold">
          <CountUp duration={3} end={99} />%
        </h1>
        <h2 className="text-xl font-bold text-text/85">Аптайм</h2>
        <p className="text-sm text-text/75">Майнкрафт севрера.</p>
      </motion.div>
    </motion.div>
  );
};

export default HomePageStatsWidget;
