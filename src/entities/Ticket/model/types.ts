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
