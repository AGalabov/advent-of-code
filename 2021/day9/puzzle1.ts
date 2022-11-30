import { compact, min } from 'lodash';
import { readInput } from '../utils';

const input = readInput('./input');

const matrix = input.map((line) => line.split('').map((n) => parseInt(n)));

function isMin(row: number, col: number) {
  const left = matrix[row][col - 1];
  const right = matrix[row][col + 1];
  const down = matrix[row + 1]?.[col];
  const up = matrix[row - 1]?.[col];

  const current = matrix[row][col];

  return (
    (min([left, right, down, up].filter((v) => v !== undefined)) as number) >
    current
  );
}

let sum = 0;

matrix.forEach((row, rI) => {
  row.forEach((_col, cI) => {
    if (isMin(rI, cI)) {
      sum += matrix[rI][cI] + 1;
    }
  });
});

console.log('Solution:', sum);
