import { sum } from 'lodash';
import { readInput } from '../utils';

/**
 * 1 = 2 digits
 * 4 = 4 digits
 * 7 = 3 digits
 * 8 = 7 digits
 */
const uniqueLengthCombinations = [2, 3, 4, 7];

function solve(fileName: string) {
  const input = readInput(fileName);

  const results = input.map((line) => line.split(' | ')[1].split(' '));

  const numbersPerLine = results.map(
    (line) =>
      line.filter((string) => uniqueLengthCombinations.includes(string.length))
        .length
  );

  console.log('Solution:', sum(numbersPerLine));
}

solve('input');
