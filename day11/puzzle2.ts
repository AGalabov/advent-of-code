import { times } from 'lodash';
import { readInput } from '../utils';

function markIfInRange(matrix: number[][], rowI: number, colI: number) {
  if (
    rowI >= 0 &&
    rowI < matrix.length &&
    colI >= 0 &&
    colI < matrix[0].length
  ) {
    // console.log('Will increment', matrix[rowI][colI]);
    matrix[rowI][colI]++;
    // console.log('Did increment', matrix[rowI][colI]);
  }
}

function markAdjacent(
  matrix: number[][],
  alreadyFlashed: [number, number][],
  rowI: number,
  colI: number
) {
  // console.log('Called with', rowI, colI, matrix[rowI][colI]);
  markIfInRange(matrix, rowI - 1, colI - 1);
  markIfInRange(matrix, rowI - 1, colI);
  markIfInRange(matrix, rowI - 1, colI + 1);
  markIfInRange(matrix, rowI, colI - 1);
  markIfInRange(matrix, rowI, colI);
  markIfInRange(matrix, rowI, colI + 1);
  markIfInRange(matrix, rowI + 1, colI - 1);
  markIfInRange(matrix, rowI + 1, colI);
  markIfInRange(matrix, rowI + 1, colI + 1);

  // console.log('After marks:', matrix[rowI][colI]);

  matrix.forEach((row, rI) =>
    row.forEach((col, cI) => {
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

function solve(fileName: string) {
  const input = readInput(fileName);

  const matrix = input.map((line) => line.split('').map((n) => parseInt(n)));

  let dayIndex = 0;

  while (true) {
    if (matrix.flat().every((val) => val === 0)) {
      break;
    }
    passDay(matrix);
    dayIndex++;
  }

  console.log(matrix.map((col) => col.join('')));

  return dayIndex;
}

console.log('Solution:', solve('./input'));
