import { initial, max, min, times } from 'lodash';
import { readInput } from '../utils';

const [line] = readInput('input');

const numbers = line.split(',').map((n) => parseInt(n));

const maximum = max(numbers) as number;
const minimum = min(numbers) as number;

function calculateCostToTarget(initial: number, target: number) {
  const difference = Math.abs(initial - target);

  return (difference * (difference + 1)) / 2;
}

// console.log(calculateCostToTarget(5, 16));
// console.log(calculateCostToTarget(16, 5));

function calculateCost(numbers: number[], target: number) {
  return numbers.reduce(
    (acc, curr) => acc + calculateCostToTarget(curr, target),
    0
  );
}

let bestCost = -1;
times(maximum - minimum + 1).forEach((v, i) => {
  const cost = calculateCost(numbers, minimum + i);
  if (bestCost < 0 || cost < bestCost) {
    bestCost = cost;
  }
});

console.log(bestCost);
