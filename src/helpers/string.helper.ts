import { round } from "./number.helper";

export const getStringSizeInMBytes = (str: string) => {
  return round(
    ((new TextEncoder().encode(str).length) / 1024) / 1024
  );
};
