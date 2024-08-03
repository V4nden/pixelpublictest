export interface ITicketPlay {
  phrase: string;
  promo?: string;
  user: {
    id: string;
    nickname: string;
    password: string;
    wherefrom?: string;
    age: string;
  };
}
export interface IPlayer {
  id: string;
  created: string;
  updated: string;
  name: string;
  skin: string;
  played: string;
  deaths: string;
  rep: string;
  status: string;
  village: string;
  plus: boolean;
  discord: string;
  did: string;
}

export interface IWikiArticle {
  id: string;
  category: string;
  title: string;
  content: string;
  article: string;
  created: string;
  updated: string;
}

export interface INewsPost {
  collectionId: string;
  collectionName: string;
  content: string;
  created: string;
  id: string;
  image: string;
  title: string;
  updated: string;
}
