import { max, times } from 'lodash';
import { findDimensions, Line, readDay5Input } from './common';

const lines = readDay5Input('./input');

function getMultipliers(line: Line) {
  const differenceX = line.start.x - line.end.x;
  const differenceY = line.start.y - line.end.y;

  const multiplierX = differenceX > 0 ? -1 : differenceX === 0 ? 0 : 1;
  const multiplierY = differenceY > 0 ? -1 : differenceY === 0 ? 0 : 1;

  const maxDifference =
    Math.abs(differenceX) > Math.abs(differenceY)
      ? Math.abs(differenceX)
      : Math.abs(differenceY);
  return {
    multiplierX,
    multiplierY,
    maxDifference,
  };
}

function solve(lines: Line[]) {
  const { maxX, maxY } = findDimensions(lines);

  const map = times(maxX + 1, () => times(maxY + 1, () => 0));

  lines.forEach((line) => {
    const { multiplierX, multiplierY, maxDifference } = getMultipliers(line);
    times(maxDifference + 1).map((_el, i) => {
      map[line.start.x + i * multiplierX][line.start.y + i * multiplierY]++;
    });
  });

  return map.flat().filter((v) => v > 1).length;
}

const filteredLines = lines.filter(
  (line) => line.start.x === line.end.x || line.start.y === line.end.y
);

// The updated implementation of solve could be used for puzzle1 as well
console.log('Solution puzzle1:', solve(filteredLines));

console.log('Solution puzzle2:', solve(lines));
