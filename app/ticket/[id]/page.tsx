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
    <main className="flex min-h-screen flex-col justify-center items-center sm:px-4 md:px-32 lg:px-64 text-center">
      <div className="absolute left-0 top-0 w-full h-screen flex justify-center -z-10">
        <Image
          src="/sc.png"
          width={1920}
          height={1080}
          className="w-full top-0 left-0 h-full object-cover -z-10 brightness-75"
          alt=""
        />
        <div className="w-full min-h-screen absolute top-0 left-0 bg-gradient-to-t from-background via-background/0 to-background/25" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-3xl">Заявка {ticket.user.nickname}</h1>
        {promo && (
          <div className="flex items-center gap-2 ">
            <p>Активирован промокод</p>
            <span className="text-primary font-bold text-xl">{promo.code}</span>
          </div>
        )}
        <PlayTicketCode phrase={ticket.phrase} />

        <p>К оплате: {promo ? 100 - promo.discount : 100}₽</p>
        {promo && 100 - promo.discount == 0 ? (
          <div className="text-sm">
            Ваша заявка в обработке. <br /> Вам придёт сообщение в ЛС дискорда с
            данными для игры.
          </div>
        ) : (
          <>
            <div className="text-sm flex flex-col gap-2 items-center justify-center">
              Ваша заявка в обработке. <br /> Данные для игры придут вам в лс
              дискорда после рассмотрения заявки
              <PlayTicketCopyAndRedirect code={ticket.phrase} />
            </div>
          </>
        )}
      </div>
    </main>
  ) : (
    <div>no</div>
  );
};
export default Page;
export const dynamic = "force-dynamic";
