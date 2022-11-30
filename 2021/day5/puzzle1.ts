import { times } from 'lodash';
import { findDimensions, Line, readDay5Input } from './common';

const lines = readDay5Input('./input');

function solve(lines: Line[]) {
  const { maxX, maxY } = findDimensions(lines);

  const map = times(maxX + 1, () => times(maxY + 1, () => 0));

  lines.forEach((line) => {
    if (line.start.x === line.end.x) {
      const multiplier = line.start.y - line.end.y > 0 ? -1 : 1;
      times(Math.abs(line.start.y - line.end.y) + 1).map((_el, i) => {
        map[line.start.x][line.start.y + i * multiplier]++;
      });
    }
    if (line.start.y === line.end.y) {
      const multiplier = line.start.x - line.end.x > 0 ? -1 : 1;
      times(Math.abs(line.start.x - line.end.x) + 1).map((_el, i) => {
        map[line.start.x + i * multiplier][line.start.y]++;
      });
    }
  });

  return map.flat().filter((v) => v > 1).length;
}

console.log('Solution:', solve(lines));
