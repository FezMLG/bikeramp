import { format } from 'date-fns';

export const getDayFromNum = (day: number) => {
  return format(new Date().setDate(day), 'yyyy-MM-dd');
};

export const getDayFromDate = (day: Date) => {
  return format(day, 'yyyy-MM-dd');
};
