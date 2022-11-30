import { times } from 'lodash';
import { readInput } from '../utils';

function markIfInRange(matrix: number[][], rowI: number, colI: number) {
  if (
    rowI >= 0 &&
    rowI < matrix.length &&
    colI >= 0 &&
    colI < matrix[0].length
  ) {
    matrix[rowI][colI]++;
  }
}

function markAdjacent(
  matrix: number[][],
  alreadyFlashed: [number, number][],
  rowI: number,
  colI: number
) {
  markIfInRange(matrix, rowI - 1, colI - 1);
  markIfInRange(matrix, rowI - 1, colI);
  markIfInRange(matrix, rowI - 1, colI + 1);
  markIfInRange(matrix, rowI, colI - 1);
  markIfInRange(matrix, rowI, colI);
  markIfInRange(matrix, rowI, colI + 1);
  markIfInRange(matrix, rowI + 1, colI - 1);
  markIfInRange(matrix, rowI + 1, colI);
  markIfInRange(matrix, rowI + 1, colI + 1);

  matrix.forEach((row, rI) =>
    row.forEach((_, cI) => {
      if (
        matrix[rI][cI] >= 10 &&
        !alreadyFlashed.some(([rowI, colI]) => rowI === rI && colI === cI)
      ) {
        alreadyFlashed.push([rI, cI]);
        markAdjacent(matrix, alreadyFlashed, rI, cI);
      }
    })
  );
}

function passDay(matrix: number[][]) {
  matrix.forEach((row, rI) => row.forEach((_, cI) => matrix[rI][cI]++));

  const alreadyFlashed: [number, number][] = [];

  matrix.forEach((row, rI) =>
    row.forEach((col, cI) => {
      if (col === 10) {
        alreadyFlashed.push([rI, cI]);
        markAdjacent(matrix, alreadyFlashed, rI, cI);
      }
    })
  );

  let flashes = 0;
  matrix.forEach((row, rI) =>
    row.forEach((col, cI) => {
      if (col >= 10) {
        flashes++;
        matrix[rI][cI] = 0;
      }
    })
  );

  return flashes;
}

function solve(fileName: string, daysCount = 100) {
  const input = readInput(fileName);

  const matrix = input.map((line) => line.split('').map((n) => parseInt(n)));

  return times(daysCount).reduce((acc, _) => acc + passDay(matrix), 0);
}

console.log('Solution:', solve('./input'));
