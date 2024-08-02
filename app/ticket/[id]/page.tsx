import VignettedImage from "@/src/shared/VignettedImage";
import { getTicketPlayById, pb } from "@/src/utils/pocketbase";
import PlayTicketCode from "@/src/widgets/ticket/PlayTicketCode";
import PlayTicketCopyAndRedirect from "@/src/widgets/ticket/PlayTicketCopyAndRedirect";
import Image from "next/image";
import React from "react";

type Props = { params: { id: string } };

const Page = async (props: Props) => {
  if (!props.params.id) return <div>NOID</div>;
  if (props.params.id.length != 15) return <div>NOID</div>;

  const ticket = await getTicketPlayById(props.params.id);
  const promos = await pb.collection("promos").getFullList({
    filter: 'code="' + ticket.promo + '"',
    $autoCancel: false,
    headers: { key: String(process.env.POCKETBASE_KEY) },
  });
  const promo = ticket.promo ? await promos[0] : null;
  return ticket ? (
    <main className="flex min-h-screen flex-col justify-center items-center text-center">
      <VignettedImage src="/sc.png" />
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-3xl">Заявка {ticket.user.nickname}</h1>
        <PlayTicketCode phrase={ticket.phrase} />
        <div>
          <PlayTicketCopyAndRedirect
            code={ticket.phrase}
            price={promo ? 100 - promo.discount : 100}
          />
        </div>
      </div>
    </main>
  ) : (
    <div>no</div>
  );
};
export default Page;
export const dynamic = "force-dynamic";
