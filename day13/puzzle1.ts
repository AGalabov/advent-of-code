import { foldOnce, readDay13Input } from './common';

function countDots(matrix: string[][]) {
  return matrix.flat().filter((point) => point === '#').length;
}

function solve(fileName: string) {
  const { matrix, folds } = readDay13Input(fileName);

  const newMatrix = foldOnce(matrix, folds[0]);

  return countDots(newMatrix);
}

console.log('Solution:', solve('./input'));
