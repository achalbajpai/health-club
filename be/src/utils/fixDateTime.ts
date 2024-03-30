import { format } from "date-fns";
export function fixedDateToPrisma(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
}
export function fixedDateFromPrisma(date: string) {
  return new Date(date.substring(0, date.length - 1));
}
