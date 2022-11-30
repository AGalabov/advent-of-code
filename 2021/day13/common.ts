import { take, times } from 'lodash';
import { readInput } from '../utils';

export interface Instruction {
  direction: 'horizontal' | 'vertical';
  offset: number;
}

export interface Point {
  offsetX: number;
  offsetY: number;
}

function createPoint(line: string): Point {
  const [offsetX, offsetY] = line.split(',').map((n) => parseInt(n));

  return { offsetX, offsetY };
}

function createFoldInstruction(line: string): Instruction {
  const instruction = line.split('fold along ')[1];

  const [direction, offset] = instruction.split('=');

  return {
    direction: direction === 'x' ? 'vertical' : 'horizontal',
    offset: parseInt(offset),
  };
}

function getDimensions(points: Point[]) {
  return points.reduce(
    (acc, curr) => {
      return {
        horizontal:
          curr.offsetX > acc.horizontal ? curr.offsetX : acc.horizontal,
        vertical: curr.offsetY > acc.vertical ? curr.offsetY : acc.vertical,
      };
    },
    { vertical: 0, horizontal: 0 }
  );
}

export function foldVertical(matrix: string[][], offset: number) {
  return matrix.map((row, rowIndex) =>
    take(row, offset).map((point, index) => {
      return point === '#' ||
        (offset + offset - index < matrix[0].length &&
          matrix[rowIndex][offset + offset - index] === '#')
        ? '#'
        : '.';
    })
  );
}

export function foldHorizontal(matrix: string[][], offset: number) {
  return take(matrix, offset).map((row, rowIndex) =>
    row.map((point, index) => {
      return point === '#' ||
        (offset + offset - rowIndex < matrix.length &&
          matrix[offset + offset - rowIndex][index] === '#')
        ? '#'
        : '.';
    })
  );
}

export function foldOnce(matrix: string[][], instruction: Instruction) {
  if (instruction.direction === 'horizontal') {
    return foldHorizontal(matrix, instruction.offset);
  }
  return foldVertical(matrix, instruction.offset);
}

export function readDay13Input(fileName: string) {
  const input = readInput(fileName);

  const index = input.findIndex((line) => line === '');

  const points = input.slice(0, index).map(createPoint);
  const folds = input.slice(index + 1).map(createFoldInstruction);

  const { horizontal, vertical } = getDimensions(points);

  const matrix = times(vertical + 1, () => times(horizontal + 1, () => '.'));

  points.forEach((point) => {
    matrix[point.offsetY][point.offsetX] = '#';
  });

  return { matrix, folds };
}
