import NotFound from "@/app/not-found";
import getTicket from "@/src/entities/Ticket/api/getTicket";
import { ITicketExpandable } from "@/src/entities/Ticket/model/types";
import TicketReportPage from "@/src/pages/tickets/TicketReportPage";
import React from "react";

type Props = { params: { id: string } };

const TicketReport = async (props: Props) => {
  const ticketReport = await getTicket(props.params.id, [
    ITicketExpandable.FROM,
    ITicketExpandable.THREAD,
  ]);

  if (ticketReport == null) return <NotFound />;
  if (ticketReport.type != "report") return <NotFound />;

  return <TicketReportPage ticket={ticketReport} />;
};

export default TicketReport;
