import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.POCKETBASE_URL);
pb.autoCancellation(false);

// fetch a paginated records list

export interface IPBDefault {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
}
