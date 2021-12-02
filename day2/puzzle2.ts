import { test } from './input';

const reduced = test.reduce(
  (acc, curr) => {
    const [direction, dist] = curr.split(' ');
    const distance = Number(dist);
    if (direction === 'forward') {
      return {
        depth: acc.depth + distance * acc.aim,
        horizontal: acc.horizontal + distance,
        aim: acc.aim,
      };
    }

    return {
      ...acc,
      aim: acc.aim + distance * (Number(direction === 'down') || -1),
    };
  },
  { depth: 0, horizontal: 0, aim: 0 }
);

console.log(reduced.depth * reduced.horizontal);
