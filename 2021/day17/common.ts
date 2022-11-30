import { readInput } from '../utils';

export interface Target {
  lowestY: number;
  highestY: number;
  furthestX: number;
  closestX: number;
}

export function readDay17Input(fileName: string): Target {
  const [input] = readInput(fileName);

  const [xRange, yRange] = input.slice(13).split(', ');

  const xDimensions = xRange.slice(2).split('..');
  const yDimensions = yRange.slice(2).split('..');

  const [closestX, furthestX, lowestY, highestY] = [
    ...xDimensions,
    ...yDimensions,
  ].map((num) => parseInt(num));

  return { closestX, furthestX, lowestY, highestY };
}
