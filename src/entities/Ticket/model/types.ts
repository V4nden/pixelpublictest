import { IPBDefault } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";
import { IThread } from "../../Thread/model/types";

export interface ITicketPlay {
  phrase: string;
  id: string;
  promo?: string;
  user: {
    id: string;
    nickname: string;
    password: string;
    wherefrom?: string;
    age: string;
  };
}
export interface ITicketPlayPromo {
  code: string;
  from: string;
  discount: number;
  id: string;
}

export interface ITicket extends IPBDefault {
  from: string;
  data: ITicketReportFormdata;
  thread?: string;
  result?: string;
  type: "village" | "report" | "question";
  expand?: {
    from: IPlayer;
    thread: IThread;
  };
}

export enum ITicketExpandable {
  FROM = "from",
  THREAD = "thread",
}

export interface ITicketReportFormdata {
  description: string;
  players: IPlayer[];
  rules: string;
}
