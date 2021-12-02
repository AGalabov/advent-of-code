import { test } from './input.js';
import _ from 'lodash';

// Solution 1
const reduced = test.reduce(
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
const [forward, depth] = _.partition(
  test.map((input) => input.split(' ')),
  ([direction]) => direction === 'forward'
);
const horizontal = forward.reduce((a, [_, dist]) => a + Number(dist), 0);
const vertical = depth.reduce(
  (a, [dir, dist]) => a + Number(dist) * (dir === 'down' || -1),
  0
);
console.log('Solution2:', vertical * horizontal);
