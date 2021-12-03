import { input } from './input';
import { partition } from 'lodash';

// Solution 1
const reduced = input.reduce(
  (acc, curr) => {
    const [direction, dist] = curr.split(' ');
    const distance = Number(dist);
    return {
      depth:
        acc.depth +
        (direction === 'down' ? distance : direction === 'up' ? -distance : 0),
      horizontal: acc.horizontal + (direction === 'forward' ? distance : 0),
    };
  },
  { depth: 0, horizontal: 0 }
);

console.log('Solution1:', reduced.depth * reduced.horizontal);

// Solution 2
const [forward, depth] = partition(
  input.map((input) => input.split(' ')),
  ([direction]) => direction === 'forward'
);
const horizontal = forward.reduce((a, [_, dist]) => a + Number(dist), 0);
const vertical = depth.reduce(
  (a, [dir, dist]) => a + Number(dist) * (Number(dir === 'down') || -1),
  0
);
console.log('Solution2:', vertical * horizontal);
