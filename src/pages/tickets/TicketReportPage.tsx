import Player from "@/src/entities/Player/ui/Player";
import ThreadPreview from "@/src/entities/Thread/ui/ThreadPreview";
import {
  ITicket,
  ITicketReportFormdata,
} from "@/src/entities/Ticket/model/types";
import VignettedImage from "@/src/shared/VignettedImage";
import React from "react";

interface Props {
  ticket: ITicket;
}

const TicketReportPage = ({ ticket }: Props) => {
  if (!ticket) return null;

  const reportData: ITicketReportFormdata = ticket.data;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center lg:w-1/3 md:w-1/2 sm:w-auto sm:mx-4 md:m-auto gap-4 py-20">
      <VignettedImage
        src="https://media.discordapp.net/attachments/1057673012943532084/1308676709305815111/image.png?ex=673ecfa9&is=673d7e29&hm=cf73847e9eb6f3fa27bb1e4cfd7f6f355e2497b15286b8dc702d4093a3f7146f&=&format=webp"
        className="brightness-50"
      />
      <div className="w-full active border p-4 flex items-center justify-center flex-col gap-2">
        {ticket.expand?.from && (
          <h1 className="flex gap-2 items-center font-bold text-xl">
            <span>Жалоба</span>
            <Player player={ticket.expand?.from} headPos="right" />
          </h1>
        )}
      </div>
      <div className="w-full active border p-4 flex items-center justify-center flex-col gap-2">
        <h2 className="text-lg font-bold">{reportData.rules}</h2>
        <hr className="active w-full" />
        <p>{reportData.description}</p>
        <hr className="active w-full" />
        {reportData.players.map((player) => {
          return <Player key={player.id} player={player} />;
        })}
      </div>
      {ticket.expand?.thread && (
        <div className="w-full active border p-4 flex items-center justify-center flex-col gap-2">
          <ThreadPreview thread={ticket.expand?.thread} small />
        </div>
      )}
    </main>
  );
};

export default TicketReportPage;
