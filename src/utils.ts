import { format } from 'date-fns';

export const getDayFromNum = (day: number) => {
  return format(new Date().setDate(day), 'yyyy-MM-dd');
};

export const getDayFromDate = (day: Date) => {
  return format(day, 'yyyy-MM-dd');
};

export enum Units {
  km = 'km',
  m = 'm',
  cm = 'cm',
}

export const convertUnits = (units: Units, distance: number): string => {
  let ret_distance: string;
  if (units == 'km') {
    return (ret_distance = distance / 100 + 'km');
  } else if (units == 'cm') {
    return (ret_distance = distance * 100 + 'cm');
  } else if (units == 'm') {
    return (ret_distance = distance + 'm');
  }
  return;
};
