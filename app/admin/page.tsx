import { pb } from "@/src/app/pocketbase";
import Image from "next/image";
import React from "react";

type Props = {};

const Admin = async (props: Props) => {
  const records = await pb.collection("ticketplay").getFullList({
    headers: { key: String(process.env.POCKETBASE_KEY) },
    sort: "-created",
  });
  return (
    <main className="flex min-h-screen flex-col justify-center items-center ">
      <div className="absolute left-0 top-0 w-full h-screen flex justify-center -z-10">
        <Image
          src="/sc.png"
          width={1920}
          height={1080}
          className="w-full top-0 left-0 h-full object-cover -z-10 brightness-75"
          alt=""
        />
        <div className="w-full min-h-screen absolute top-0 left-0 bg-gradient-to-t from-background via-background/0 to-background/25" />
      </div>
      <h1 className="text-3xl">Заявки</h1>

      <table className="overflow-x-auto">
        <tr className="">
          <th className="border border-accent/50 bg-background/50 font-bold p-2 px-4">
            Created
          </th>
          <th className="border border-accent/50 bg-background/50 font-bold p-2 px-4">
            Id
          </th>
          <th className="border border-accent/50 bg-background/50 font-bold p-2 px-4">
            Phrase
          </th>
          <th className="border border-accent/50 bg-background/50 font-bold p-2 px-4">
            Promo
          </th>
          <th className="border border-accent/50 bg-background/50 font-bold p-2 px-4">
            Updated
          </th>
          <th className="border border-accent/50 bg-background/50 font-bold p-2 px-4">
            Player
          </th>
        </tr>
        {records.map((el, index) => {
          return (
            <tr key={index}>
              {Object.values(el)
                .slice(2)
                .map((val, index) => {
                  return (
                    <td
                      key={index}
                      className="border border-accent/50 bg-background/25 text-sm p-2 px-4"
                    >
                      {typeof val == "object" ? (
                        <div className="flex flex-col gap-2 bg-background/25 rounded-xl p-4">
                          {Object.entries(val).map(([key, el], index) => {
                            return (
                              <div
                                key={index}
                                className="flex gap-4 justify-between items-center bg-background/25 rounded-xl p-2"
                              >
                                <h2 className="text-base font-bold">{key}</h2>
                                <p>{String(el)}</p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        String(val)
                      )}
                    </td>
                  );
                })}
            </tr>
          );
        })}
      </table>
    </main>
  );
};
export const revalidate = 1;
export default Admin;
