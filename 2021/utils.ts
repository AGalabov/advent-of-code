import fs from 'fs';
import path from 'path';

export function readInput(fileName: string, split = '\n') {
  const file = path.resolve(fileName);
  const buffer = fs.readFileSync(file, { encoding: 'utf8' });

  return buffer.split(split);
}
