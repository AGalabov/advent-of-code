import { readDay17Input } from './common';

// Note: This one works for lowestY < 0 and this
// was my input so it was fast and easy :D
// I'll solve it properly some day
function solve(fileName: string) {
  const { lowestY } = readDay17Input(fileName);

  const maximum = Math.abs(lowestY);

  return (maximum * (maximum - 1)) / 2;
}

console.log('Solution:', solve('./input'));
