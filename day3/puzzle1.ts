import { times } from 'lodash';
import { input } from './input';

const inputAsDigits = input.map((s) => s.split('').map(Number));

const reduced = inputAsDigits.reduce(
  (acc, curr) => acc.map((a, i) => a + (curr[i] || -1)),
  times(inputAsDigits[0].length, () => 0)
);

const gamma = parseInt(reduced.map((n) => `${Number(n > 0)}`).join(''), 2);
const epsilon = parseInt(reduced.map((n) => `${Number(n <= 0)}`).join(''), 2);

console.log(gamma * epsilon);
