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
