import TicketPlayInfoPage from "@/src/pages/tickets/play/TicketPlayInfoPage";

type Props = { params: { id: string } };

const TicketPlayInfo = async (props: Props) => {
  return <TicketPlayInfoPage params={props.params} />;
};
export default TicketPlayInfo;
export const dynamic = "force-dynamic";
