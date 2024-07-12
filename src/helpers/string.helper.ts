import { round } from "./number.helper";

export const getStringSizeInKBytes = (str: string) => {
  return round(
    (new TextEncoder().encode(str).length) / 1024
  );
};
