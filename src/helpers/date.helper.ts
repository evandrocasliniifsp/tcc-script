import { round } from './number.helper';

export const makeDateFromString = (date?: string) => {
  if (!date) return null;

  const [year, month, day] = date.split('-');
  if (day === '00' || month === '00') {
    if (year === '0000') return null;

    return new Date(`${year}-01-01`);
  }

  return new Date(date);
};
