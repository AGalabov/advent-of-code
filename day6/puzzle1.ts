import { times } from 'lodash';
import { readInput } from '../utils';

const [input] = readInput('./sample');

const fish = input.split(',').map((num) => parseInt(num));

const result = times(80).reduce((acc, _c) => {
  let toAdd = 0;

  const fishAfterDay = acc.map((f) => {
    if (f === 0) {
      toAdd++;
      return 6;
    }
    return f - 1;
  });

  const added = times(toAdd, () => 8);
  return [...fishAfterDay, ...added];
}, fish);

console.log(result, result.length);
