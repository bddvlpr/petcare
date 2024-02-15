import type { Routine, RoutineLog } from '@prisma/client';
import moment from 'moment';

export const toLocaleDateString = (date: Date | undefined | null) =>
  date?.toLocaleDateString() ?? '?';

export const toLocaleString = (date: Date | undefined | null) =>
  date?.toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) ?? '?';

export const toReadableHour = (input: number | undefined | null) =>
  input
    ? `${Math.floor(input / 60)
        .toString()
        .padStart(2, '0')}:${(input % 60).toString().padStart(2, '0')}`
    : '?';

export const toRelativeTime = (date: Date | undefined | null) => moment(date).fromNow();

export const isDue = (routineLog: RoutineLog | undefined | null, routine: Routine) =>
  !routineLog?.timestamp ||
  moment(routineLog.timestamp)
    .add(routine.intervalDays, 'days')
    .hours(0)
    .minutes(routine.intervalTime)
    .isBefore(moment());
