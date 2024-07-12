export const round = (n: number) => {
  return Number(n.toFixed(2));
};

export const convertMillisecondsToSeconds = (time: number) => {
  return round(time / 1000);
};
