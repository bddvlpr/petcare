export const toLocalDateString = (date: Date | undefined | null) =>
  date?.toLocaleDateString() ?? '?';
