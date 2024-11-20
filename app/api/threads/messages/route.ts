import createMessage from "@/src/entities/Thread/api/createMessage";
import formDataToJson from "@/src/shared/utils/formDataToJson";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";
import { getThreadMessages } from "@/src/entities/Thread/api/getThreadMessages";
import { getThreadById } from "@/src/entities/Thread/api/getThreadBtId";
import {
  IMessageExpandable,
  IThreadExpandable,
} from "@/src/entities/Thread/model/types";
import { messageValidationSchema } from "@/src/entities/Thread/model/messageValidationSchema";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id || id.length != 15)
    return NextResponse.json({ error: "No parameter provided" });

  const session = await getServerSession(nextAuthOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" });

  const thread = await getThreadById(id, [IThreadExpandable.ALLOWED]);
  if (!thread) return NextResponse.json({ error: "Not found" });

  if (
    thread.expand?.allowed &&
    thread.expand?.allowed.find((player) => player.id != session.user.player.id)
  ) {
    return NextResponse.json({ error: "Not allowed" });
  }

  return NextResponse.json(
    await getThreadMessages(id, [IMessageExpandable.AUTHOR])
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id || id.length != 15)
    return NextResponse.json({ error: "No parameter provided" });

  const session = await getServerSession(nextAuthOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" });

  const thread = await getThreadById(id, [IThreadExpandable.ALLOWED]);
  if (!thread) return NextResponse.json({ error: "Not found" });

  if (
    thread.expand?.allowed &&
    thread.expand?.allowed.find(
      (player) => player.id != session.user.player.id
    ) &&
    thread.creator != session.user.player.id
  ) {
    return NextResponse.json({ error: "Not allowed" });
  }

  const formBody: FormData = await req.formData();

  try {
    const formJsonData = formDataToJson(formBody);

    const finalData = messageValidationSchema.validateSync({
      ...formJsonData,
      attachments: formJsonData.attachments ? formJsonData.attachments : [],
    });

    const message = await createMessage(
      { authorId: session.user.player.id, ...finalData },
      id
    );

    //TODO  разобрать что я тут написад и почему мессеж не юзается

    return NextResponse.json(
      await getThreadMessages(id, [IMessageExpandable.AUTHOR])
    );
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      console.log(e.errors);
      return NextResponse.json(e.errors);
    }
  }
}
