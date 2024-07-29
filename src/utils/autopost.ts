import moment from "moment";
import { pb } from "./pocketbase";
export default async function autopost(
  title: string,
  image: string,
  message: string
) {
  const data = {
    embeds: [
      {
        title: "",
        footer: { text: "©Pixel " + moment().year() },
        image: {
          url: image,
        },
        description: `# ${title}
  ${message}

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
    "https://api.telegram.org/bot" + process.env.NTELEGRAM_TOKEN + "/sendPhoto",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: -1001555804470,
        caption: `🧡 *${title}* \n\n${message}`,
        photo: image,
        parse_mode: "Markdown",
      }),
    }
  ).then(async (res) => {
    console.log(await res.json());
  });
  await pb
    .collection("news")
    .create(
      { title: title, image: image, content: message },
      { headers: { key: String(process.env.POCKETBASE_KEY) } }
    );
}
