"use client";
import Select from "@/src/shared/ui/Select/Select";
import VignettedImage from "@/src/shared/VignettedImage";
import TicketReportForm from "@/src/features/TicketReportForm/TicketReportForm";
import React, { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaExclamationCircle, FaHome, FaQuestionCircle } from "react-icons/fa";

type Props = {};

const TicketsPage = (props: Props) => {
  const tickets = [
    {
      display: (
        <div className="flex gap-2 items-center">
          <FaExclamationCircle />{" "}
          <div className="flex flex-col gap-1">
            <h1>Жалоба</h1>
            <p className="text-sm text-text/75">
              Оставить жалобу на игрока / сервер
            </p>
          </div>
        </div>
      ),
      value: "report",
    },
    {
      display: (
        <div className="flex gap-2 items-center">
          <FaHome />{" "}
          <div className="flex flex-col gap-1">
            <h1>Поселение</h1>
            <p className="text-sm text-text/75">
              Подать заявку на регистрацию поселения
            </p>
          </div>
        </div>
      ),
      value: "village",
    },
    {
      display: (
        <div className="flex gap-2 items-center">
          <FaQuestionCircle />{" "}
          <div className="flex flex-col gap-1">
            <h1>Вопрос</h1>
            <p className="text-sm text-text/75">Задать вопрос администрации</p>
          </div>
        </div>
      ),
      value: "question",
    },
  ];

  const forms: { [key: string]: ReactNode } = {
    report: <TicketReportForm />,
    village: <div>dev</div>,
    question: <div>dev</div>,
  };

  const [selectedTicket, setSelectedTicket] = useState(tickets[0].value);

  return (
    <main className="min-h-screen flex flex-col items-center lg:w-1/3 md:w-1/2 sm:w-auto sm:mx-4 md:m-auto gap-4 py-20">
      <VignettedImage
        src="https://media.discordapp.net/attachments/1057673012943532084/1308676709305815111/image.png?ex=673ecfa9&is=673d7e29&hm=cf73847e9eb6f3fa27bb1e4cfd7f6f355e2497b15286b8dc702d4093a3f7146f&=&format=webp"
        className="brightness-50"
      />
      <Select
        options={tickets}
        initialValue={tickets[0]}
        onChange={(e) => {
          setSelectedTicket(e);
        }}
      />
      {forms[selectedTicket]}
    </main>
  );
};

export default TicketsPage;
