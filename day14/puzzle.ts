import { times } from 'lodash';
import { readDay14Input, Rule } from './common';
import { NumbersMap } from '../lib/maps';

function passRound(currentPairs: NumbersMap, rules: Rule[]) {
  let resultMap = new NumbersMap(currentPairs);

  rules.forEach((rule) => {
    const numberOfMatches = currentPairs.get(rule.input);

    const resultingPair1 = rule.input[0] + rule.result;
    const resultingPair2 = rule.result + rule.input[1];

    resultMap.subtract(rule.input, numberOfMatches);
    resultMap.add(resultingPair1, numberOfMatches);
    resultMap.add(resultingPair2, numberOfMatches);
  });

  return resultMap;
}

function findResult(resultPairs: NumbersMap, lastChar: string) {
  let elementsMap: Record<string, number> = {};

  resultPairs.forEach((matchesCount, key) => {
    const [char1] = key;

    elementsMap = {
      ...elementsMap,
      [char1]: (elementsMap[char1] ?? 0) + matchesCount,
    };
  });

  elementsMap[lastChar]++;

  const allValues = Object.values(elementsMap);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  return maxValue - minValue;
}

function solve(fileName: string, days: number) {
  const { template, rules } = readDay14Input(fileName);

  let pairsMap = new NumbersMap();
  times(template.length - 1).forEach((_v, index) => {
    const pair = template[index] + template[index + 1];
    pairsMap.add(pair, 1);
  });

  times(days).forEach(() => {
    pairsMap = passRound(pairsMap, rules);
  });

  return findResult(pairsMap, template[template.length - 1]);
}

console.log('Solution puzzle1:', solve('./input', 10));
console.log('Solution puzzle2:', solve('./input', 40));
