import moment from 'moment';

export const toLocalDateString = (date: Date | undefined | null) =>
  date?.toLocaleDateString() ?? '?';

export const toReadableHour = (input: number | undefined | null) =>
  input
    ? `${Math.floor(input / 60)
        .toString()
        .padStart(2, '0')}:${(input % 60).toString().padStart(2, '0')}`
    : '?';

export const toRelativeTime = (date: Date | undefined | null) => moment(date).fromNow();
