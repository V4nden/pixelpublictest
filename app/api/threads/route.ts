import { getThreadById } from "@/src/entities/Thread/api/getThreadBtId";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";
import getThreadsPublic from "@/src/entities/Thread/api/getThreadsPublic";
import { IThreadExpandable } from "@/src/entities/Thread/model/types";
import formDataToJson from "@/src/shared/utils/formDataToJson";
import { threadCreationValidationSchema } from "@/src/entities/Thread/model/threadCreationValidationSchema";
import createThread from "@/src/entities/Thread/api/createThread";
import * as yup from "yup";

export async function POST(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" });
  if (!session.user.player) return NextResponse.json({ error: "Unauthorized" });

  const formBody: FormData = await req.formData();

  try {
    const formJsonData = formDataToJson(formBody);

    const finalData = threadCreationValidationSchema.validateSync({
      ...formJsonData,
    });

    const thread = await createThread(finalData.title, session.user.player);

    return NextResponse.json(thread);
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      console.log(e.errors);
      return NextResponse.json(e.errors);
    }
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const filter = req.nextUrl.searchParams.get("filter");

  const session = await getServerSession(nextAuthOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" });

  if (!id) {
    const threads = await getThreadsPublic(
      [IThreadExpandable.CREATOR, IThreadExpandable.RECENT_MESSAGE],
      filter
        ? `creator.name~'${filter
            .replaceAll('"', "")
            .replaceAll("'", "")}'||title~"${filter
            .replaceAll('"', "")
            .replaceAll("'", "")}"`
        : undefined
    );

    return NextResponse.json(threads);
  } else {
    const thread = await getThreadById(id);
    if (!thread) return NextResponse.json({ error: "Not found" });
    if (thread && thread.allowed) {
      if (!thread.allowed.includes(session.user.player))
        return NextResponse.json({ error: "Not allowed" });
    }
    return NextResponse.json(thread);
  }
}
