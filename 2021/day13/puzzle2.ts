import { foldOnce, Instruction, readDay13Input } from './common';

function printMatrix(matrix: string[][]) {
  const simplified = matrix.map((row) => row.join(''));
  console.log(simplified.join('\n'));
}

function applyFoldInstructions(
  matrix: string[][],
  instructions: Instruction[]
) {
  let currentMatrix = matrix;
  instructions.forEach((instruction) => {
    currentMatrix = foldOnce(currentMatrix, instruction);
  });

  return currentMatrix;
}

function solve(fileName: string) {
  const { matrix, folds } = readDay13Input(fileName);

  const newMatrix = applyFoldInstructions(matrix, folds);

  printMatrix(newMatrix);
}

solve('./input');
