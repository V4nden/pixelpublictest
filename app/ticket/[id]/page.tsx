import { getTicketPlayById } from "@/src/entities/Ticket/api/getTicketPlayById";
import { getTicketPlayPromos } from "@/src/entities/Ticket/api/getTicketPlayPromo";
import TicketPlayInfoPage from "@/src/pages/tickets/play/TicketPlayInfoPage";

type Props = { params: { id: string } };

const TicketPlayInfo = async (props: Props) => {
  if (props.params.id.length != 15) return <div>NOID</div>;

  const ticket = await getTicketPlayById(props.params.id);
  const promos = await getTicketPlayPromos(ticket);

  return <TicketPlayInfoPage ticket={ticket} promos={promos} />;
};
export default TicketPlayInfo;
