import * as yup from "yup";
import { IPlayer } from "../../Player/model/types";

export const ticketReportCreationValidationSchema = yup.object({
  rules: yup
    .string()
    .required("Правила не могут быть пустыми")
    .min(2, "Укажите нарушенные правила")
    .max(150, "Мужик ебанутый мы его боимся"),
  players: yup
    .mixed<IPlayer[]>()
    .required("Укажите на кого будет подана жалоба")
    .test(
      "length",
      "Кол-во игроков может быть в радиусе от 1го до 15ти",
      (players) => 15 > players.length && 0 < players.length
    ),
  description: yup
    .string()
    .required("Описание не может быть пустым")
    .min(10, "Описание не может содержать меньше 10ти символов")
    .max(4096, "Описание не может быть больше 4096ти символов"),
});
