import VignettedImage from "@/src/shared/VignettedImage";
import PlayTicketCode from "@/src/entities/Ticket/ui/PlayTicketCode";
import PlayTicketCopyAndRedirect from "@/src/entities/Ticket/ui/PlayTicketCopyAndRedirect";
import { getTicketPlayById } from "@/src/entities/Ticket/api/getTicketPlayById";
import { getTicketPlayPromo } from "@/src/entities/Ticket/api/getTicketPlayPromo";

type TicketPlayInfoPageProps = { params: { id: string } };

const TicketPlayInfoPage = async (props: TicketPlayInfoPageProps) => {
  if (!props.params.id) return <div>NOID</div>;
  if (props.params.id.length != 15) return <div>NOID</div>;

  const ticket = await getTicketPlayById(props.params.id);
  const promos = await getTicketPlayPromo(ticket);
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
export default TicketPlayInfoPage;
