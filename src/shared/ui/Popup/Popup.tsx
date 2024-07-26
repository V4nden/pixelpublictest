"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
  title: string;
  children: React.ReactNode;
  state: { action: Dispatch<SetStateAction<boolean>>; current: boolean };
};

const Popup = (props: Props) => {
  return (
    <AnimatePresence mode="wait">
      {props.state.current && (
        <motion.div
          key={"popup"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed flex items-center justify-center top-0 left-0 w-screen h-screen z-20 bg-background/25 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.05 }}
            className="sm:w-10/12 md:w-1/2 min-h-1/2 max-h-screen p-6 bg-background/75 rounded-xl border-accent border relative backdrop-blur-sm flex flex-col gap-2 items-start"
          >
            <div className="flex justify-between items-center w-full">
              <h1 className="text-2xl font-extrabold">{props.title}</h1>
              <button
                className="p-2 border border-secondary/25 rounded-full"
                onClick={() => {
                  props.state.action(false);
                }}
              >
                <FaXmark size={24}></FaXmark>
              </button>
            </div>
            {props.children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
