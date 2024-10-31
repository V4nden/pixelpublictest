import { IPBDefault } from "@/src/app/pocketbase";
import { IPlayer } from "../../Player/model/types";

export interface IThread extends IPBDefault {
  name: string;
  creator: string;
  allowed: string[];
  recentMessage: {
    attachments: string[];
    author: string;
    collectionId: string;
    collectionName: string;
    content: string;
    created: string;
    id: string;
    thread: string;
    updated: string;
  };
  participants: string[];
  expand?: {
    creator?: IPlayer;
    allowed?: IPlayer[];
    participants: IPlayer[];
  };
}

export enum IThreadExpandable {
  CREATOR = "creator",
  ALLOWED = "allowed",
  PARTICIPANTS = "participants",
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
