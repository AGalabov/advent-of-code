import { NumbersMap } from '../lib/maps';
import { readInput } from '../utils';

function passDay(initialMap: NumbersMap<number>) {
  const nextDay = new NumbersMap<number>();

  initialMap.forEach((count, timer) => {
    if (timer === 0) {
      nextDay.add(timer + 8, count);
      nextDay.add(timer + 6, count);
    } else {
      nextDay.add(timer - 1, count);
    }
  });

  return nextDay;
}

function countFishes(endMap: NumbersMap<number>) {
  return [...endMap].reduce((acc, [_, count]) => acc + count, 0);
}

function solve(filename: string, days: number) {
  const [input] = readInput(filename);

  const fishes = input.split(',').map((num) => parseInt(num));

  let dayMap = new NumbersMap<number>();

  fishes.forEach((fish) => {
    dayMap.add(fish, 1);
  });

  for (let i = 0; i < days; i++) {
    dayMap = passDay(dayMap);
  }

  return countFishes(dayMap);
}

console.log('Solution puzzle1:', solve('input', 80));
console.log('Solution puzzle2:', solve('input', 256));
