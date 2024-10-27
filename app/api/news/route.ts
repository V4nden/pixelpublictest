import {
  createTicketPlay,
  getTicketPlayByDiscord,
  pb,
} from "@/src/app/pocketbase";
import fs from "fs/promises";
import moment from "moment";
import { getServerSession } from "next-auth";
export async function POST(req: Request) {
  const session = await getServerSession();
  if (session && session.user && session.user.image) {
    const body = await req.json();
    if (
      process.env.ADMIN_MAILS?.split(" ").includes(String(session.user.email))
    ) {
      const data = {
        embeds: [
          {
            title: "",
            footer: { text: "©Pixel " + moment().year() },
            image: {
              url: body.image,
            },
            description: `# ${body.title}
      ${body.content}
    
              ||<@&1055112639245713408>||`,
            color: 14727558, // Decimal color code
          },
        ],
        username: "PNews",
        avatar_url:
          "https://cdn.discordapp.com/avatars/837341994962911313/867883fd8a0c25656c67adac2eb8be55.webp?size=32",
      };
      fetch(String(process.env.NDISCORD_TOKEN), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(async (res) => {
        console.log(await res.status);
      });
      fetch(
        "https://api.telegram.org/bot" +
          process.env.NTELEGRAM_TOKEN +
          "/sendPhoto",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: -1001555804470,
            caption: `🧡 *${body.title}* \n\n${body.content}`,
            photo: body.image,
            parse_mode: "Markdown",
          }),
        }
      ).then(async (res) => {
        console.log(await res.json());
      });
      await pb.collection("news").create(
        { title: body.title, image: body.image, content: body.content },
        {
          headers: { key: String(process.env.POCKETBASE_KEY) },
          $autoCancel: false,
        }
      );
      return Response.json({ status: "OK" });
    } else {
      return Response.json({ status: "dinaxy" });
    }
  } else {
    return Response.json({ error: "unauthorized" });
  }
}
