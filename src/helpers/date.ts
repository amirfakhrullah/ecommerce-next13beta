import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from "date-fns";

export const getDateCompare = (after: Date) => {
  const currDate = new Date();
  const compareInMinutes = differenceInMinutes(currDate, after);
  if (compareInMinutes < 1) {
    return `${differenceInSeconds(currDate, after)} seconds ago`;
  } else if (compareInMinutes < 60) {
    return `${compareInMinutes} minutes ago`;
  } else if (compareInMinutes < 60 * 24) {
    return `${differenceInHours(currDate, after)} hour(s) ago`;
  } else if (compareInMinutes < 60 * 30 * 24) {
    return `${differenceInDays(currDate, after)} day(s) ago`;
  } else if (compareInMinutes < 60 * 30 * 24 * 12) {
    return `${differenceInMonths(currDate, after)} month(s) ago`;
  } else {
    return `${differenceInYears(currDate, after)} year(s) ago`;
  }
};
