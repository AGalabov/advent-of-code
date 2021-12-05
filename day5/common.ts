import { max } from 'lodash';
import { readInput } from '../utils';

interface Point {
  x: number;
  y: number;
}

export interface Line {
  start: Point;
  end: Point;
}

function parsePoint(pointInput: string) {
  const [x, y] = pointInput.split(',').map((num) => parseInt(num));
  return { x, y };
}

export function findDimensions(lines: Line[]) {
  return lines.reduce(
    (acc, line) => {
      return {
        maxX: max([line.start.x, line.end.x, acc.maxX]) as number,
        maxY: max([line.start.y, line.end.y, acc.maxY]) as number,
      };
    },
    { maxX: 0, maxY: 0 }
  );
}

export function readDay5Input(fileName: string): Line[] {
  const input = readInput(fileName);

  return input.map((inputLine) => {
    const [start, end] = inputLine.split(' -> ');

    return {
      start: parsePoint(start),
      end: parsePoint(end),
    };
  });
}
