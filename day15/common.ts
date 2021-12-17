import { times } from 'lodash';
import { readInput } from '../utils';

function generateNextTile(matrixTile: number[][]) {
  return matrixTile.map((row) => row.map((elem) => (elem + 1) % 10 || 1));
}

function generateRow(matrixRow: number[]) {
  let initialMatrixRow = matrixRow;
  const newRow: number[] = [];

  times(5).forEach(() => {
    newRow.push(...initialMatrixRow);
    initialMatrixRow = initialMatrixRow.map((elem) => (elem + 1) % 10 || 1);
  });

  return newRow;
}

function generateMatrixTileRow(matrixTile: number[][]) {
  return matrixTile.map((row) => generateRow(row));
}

function generateMatrix(matrixTile: number[][]) {
  let initialMatrixTile = matrixTile;

  const newMatrix: number[][] = [];

  times(5).forEach(() => {
    newMatrix.push(...generateMatrixTileRow(initialMatrixTile));
    initialMatrixTile = generateNextTile(initialMatrixTile);
  });

  return newMatrix;
}

export function getDay15Puzzle1Input(fileName: string) {
  const input = readInput(fileName);

  return input.map((line) => line.split('').map((num) => parseInt(num)));
}

export function getDay15Puzzle2Input(fileName: string) {
  const input = readInput(fileName);

  const matrixTile = input.map((line) =>
    line.split('').map((num) => parseInt(num))
  );

  return generateMatrix(matrixTile);
}
