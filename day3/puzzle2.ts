import { times } from 'lodash';
import { readInput } from '../utils';

const input = readInput('./input');

const inputAsDigits = input.map((s) => s.split('').map(Number));

function digitsToDecimal(digits: number[]) {
  return parseInt(digits.join(''), 2);
}

function findNumber(comparison: (n: number) => boolean) {
  const [digits] = times(inputAsDigits[0].length).reduce((readings, _c, i) => {
    const commonValue = readings
      .map((data) => data[i])
      .reduce((acc, curr) => acc + (curr || -1), 0);
    const sign = Number(comparison(commonValue));

    if (readings.length === 1) {
      return readings;
    }

    return readings.filter((data) => data[i] === sign);
  }, inputAsDigits);

  return digitsToDecimal(digits);
}

const oxygen = findNumber((n) => n >= 0);
const co2 = findNumber((n) => n < 0);

console.log(oxygen, co2, oxygen * co2);
