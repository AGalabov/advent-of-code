import { readInput } from '../utils';

function passDay(initialMap: Map<number, number>) {
  const nextDay = new Map<number, number>();

  [...initialMap].forEach(([timer, count]) => {
    if (timer === 0) {
      nextDay.set(timer + 8, (nextDay.get(timer + 8) ?? 0) + count);
      nextDay.set(timer + 6, (nextDay.get(timer + 6) ?? 0) + count);
    } else {
      nextDay.set(timer - 1, (nextDay.get(timer - 1) ?? 0) + count);
    }
  });

  return nextDay;
}

function countFishes(endMap: Map<number, number>) {
  return [...endMap].reduce((acc, [_, count]) => acc + count, 0);
}

function solve(filename: string, days: number) {
  const [input] = readInput(filename);

  const fishes = input.split(',').map((num) => parseInt(num));

  let dayMap = new Map<number, number>();

  fishes.forEach((fish) => {
    dayMap.set(fish, (dayMap.get(fish) ?? 0) + 1);
  });

  for (let i = 0; i < days; i++) {
    dayMap = passDay(dayMap);
  }

  console.log(
    `There will be ${countFishes(dayMap)} fishes on day ${days}, sir!`
  );
}

solve('input', 80);
solve('input', 256);
