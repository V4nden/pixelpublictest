import moment from "moment";

export default function dateISOToNormal(ISOstring: string) {
  return moment(ISOstring).format("HH:mm, DD.MM.yyyy");
}
