import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";
import createThread from "@/src/entities/Thread/api/createThread";
import createTicket from "@/src/entities/Ticket/api/createTicket";
import { ticketReportCreationValidationSchema } from "@/src/entities/Ticket/model/ticketReportCreationValidationSchema";
import { ITicketReportFormdata } from "@/src/entities/Ticket/model/types";
import moment from "moment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export async function POST(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" });
  if (!session.user.player) return NextResponse.json({ error: "Unauthorized" });

  const formBody: ITicketReportFormdata = await req.json();

  const threadMessage = `Жалоба игрока @${session.user.player.id}!

---
### ${formBody.rules}

${formBody.description}`;

  try {
    const finalData =
      ticketReportCreationValidationSchema.validateSync(formBody);

    const thread = await createThread(
      "Жалоба от " + moment().format("DD.MM.yyyy"),
      session.user.player,
      threadMessage,
      true,
      finalData.players.map((player) => player.id)
    );
    const ticket = await createTicket(
      session.user.player.id,
      finalData,
      "report",
      thread.id,
      "На рассмотрении"
    );

    return NextResponse.json(ticket);
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      console.log(e.errors);
      return NextResponse.json(e.errors);
    }
    return NextResponse.json(e);
  }
}
