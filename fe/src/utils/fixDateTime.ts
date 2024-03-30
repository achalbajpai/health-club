export function fixedDateFromPrisma(date: string) {
  return new Date(date.substring(0, date.length - 1));
}
