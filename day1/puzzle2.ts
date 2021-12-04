import { readInput } from '../utils';

const input = readInput('./input').map((i) => Number(i));

console.log(
  input
    .map((x, i) => (i < input.length - 2 ? Number(x < input[i + 3]) : 0))
    .reduce((x, y) => x + y)
);
