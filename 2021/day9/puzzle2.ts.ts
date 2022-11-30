import { compact, min, take, times } from 'lodash';
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

function getBasinLengthHelper(
  row: number,
  col: number,
  visited: boolean[][]
): number {
  // console.log('Called with:', row, col, visited[row][col]);

  if (visited[row][col]) {
    return -1;
  }

  const left = visited[row][col - 1] ? undefined : matrix[row][col - 1];
  const right = visited[row][col + 1] ? undefined : matrix[row][col + 1];
  const down = visited[row + 1]?.[col] ? undefined : matrix[row + 1]?.[col];
  const up = visited[row - 1]?.[col] ? undefined : matrix[row - 1]?.[col];

  visited[row][col] = true;

  let accumulated = 0;

  if (left !== undefined && left !== 9 && matrix[row][col] < left) {
    accumulated += 1 + getBasinLengthHelper(row, col - 1, visited);
  }

  if (right !== undefined && right !== 9 && matrix[row][col] < right) {
    accumulated += 1 + getBasinLengthHelper(row, col + 1, visited);
  }

  if (down !== undefined && down !== 9 && matrix[row][col] < down) {
    accumulated += 1 + getBasinLengthHelper(row + 1, col, visited);
  }

  if (up !== undefined && up !== 9 && matrix[row][col] < up) {
    accumulated += 1 + getBasinLengthHelper(row - 1, col, visited);
  }

  return accumulated;
}

function getBasinLength(row: number, col: number): number {
  const initial = times(matrix.length, () =>
    times(matrix[0].length, () => false)
  );

  return 1 + getBasinLengthHelper(row, col, initial);
}

const basins: number[] = [];

matrix.forEach((row, rI) => {
  row.forEach((_col, cI) => {
    if (isMin(rI, cI)) {
      basins.push(getBasinLength(rI, cI));
    }
  });
});

console.log(
  'Solution:',
  take(
    basins.sort((a, b) => b - a),
    3
  ).reduce((acc, curr) => acc * curr, 1)
);
