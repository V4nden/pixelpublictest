import { IPBDefault } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";

export interface IThread extends IPBDefault {
  title: string;
  creator: string;
  allowed: string[];
  participants: string[];
  recentMessage: string;
  private: boolean;
  expand?: {
    creator?: IPlayer;
    allowed?: IPlayer[];
    participants: IPlayer[];
    recentMessage: IMessage;
  };
}

export enum IThreadExpandable {
  CREATOR = "creator",
  ALLOWED = "allowed",
  PARTICIPANTS = "participants",
  RECENT_MESSAGE = "recentMessage.author",
}

export interface IMessage extends IPBDefault {
  author: string;
  content: string;
  thread: string;
  attachments: string[];
  expand?: {
    author?: IPlayer;
    thread?: IThread;
  };
}

export enum IMessageExpandable {
  AUTHOR = "author",
  THREAD = "thread",
}
