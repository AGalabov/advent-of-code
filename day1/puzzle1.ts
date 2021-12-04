import { readInput } from '../utils';

const input = readInput('./input').map((i) => Number(i));

// Solution 1
console.log(
  input
    .map((x, i) => (i > 0 ? Number(x > input[i - 1]) : 0))
    .reduce((x, y) => x + y)
);

// Solution 2 - used for type solution basis
function numberOfIncreases(
  numbers: number[],
  lastNumber: number | null = null,
  accumulator: number = 0
): number {
  if (numbers.length === 0) {
    return accumulator;
  }

  const [number, ...rest] = numbers;

  if (lastNumber && number > lastNumber) {
    return numberOfIncreases(rest, number, accumulator + 1);
  }

  return numberOfIncreases(rest, number, accumulator);
}

console.log(numberOfIncreases(input));
