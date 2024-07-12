export function* iterator(max: number) {
  for (let i = 0; i < max; i++) {
    yield i;
  }
}