import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: { params: { collection: string; record: string; attachment: string } }
) {
  const thumb = req.nextUrl.searchParams.get("thumb");

  const fileResponse = await fetch(
    process.env.POCKETBASE_URL +
      `/api/files/${params.collection}/${params.record}/${params.attachment}${
        thumb ? "?thumb=" + thumb : ""
      }`
  );

  return new Response(await fileResponse.blob(), {
    headers: {
      "Content-Type":
        fileResponse.headers.get("Content-type") || "application/octet-stream",
    },
  });

  console.log(params);
}
