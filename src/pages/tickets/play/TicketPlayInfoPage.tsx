import VignettedImage from "@/src/shared/VignettedImage";
import PlayTicketCode from "@/src/entities/Ticket/ui/PlayTicketCode";
import PlayTicketCopyAndRedirect from "@/src/entities/Ticket/ui/PlayTicketCopyAndRedirect";
import {
  ITicketPlay,
  ITicketPlayPromo,
} from "@/src/entities/Ticket/model/types";

type TicketPlayInfoPageProps = {
  ticket?: ITicketPlay;
  promos?: ITicketPlayPromo[];
};

const TicketPlayInfoPage = ({ ticket, promos }: TicketPlayInfoPageProps) => {
  if (!ticket || !promos) return;

  const promo = ticket.promo ? promos[0] : null;

  return (
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
  );
};
export default TicketPlayInfoPage;
export const dynamic = "force-dynamic";
