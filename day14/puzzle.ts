import { times } from 'lodash';
import { readDay14Input, Rule } from './common';

type PairMap = Record<string, number>;

function passRound(currentPairs: PairMap, rules: Rule[]) {
  let resultMap = { ...currentPairs };

  rules.forEach((rule) => {
    const numberOfMatches = currentPairs[rule.input] ?? 0;

    const resultingPair1 = rule.input[0] + rule.result;
    const resultingPair2 = rule.result + rule.input[1];

    resultMap[rule.input] = (resultMap[rule.input] ?? 0) - numberOfMatches;
    resultMap[resultingPair1] =
      (resultMap[resultingPair1] ?? 0) + numberOfMatches;
    resultMap[resultingPair2] =
      (resultMap[resultingPair2] ?? 0) + numberOfMatches;
  });

  return resultMap;
}

function findResult(resultPairs: PairMap, lastChar: string) {
  const matches = Object.keys(resultPairs).reduce((acc, curr) => {
    const [char1] = curr;
    const matchesCount = resultPairs[curr];
    return {
      ...acc,
      [char1]: (acc[char1] ?? 0) + matchesCount,
    };
  }, {} as PairMap);

  matches[lastChar]++;

  const allValues = Object.values(matches);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  return maxValue - minValue;
}

function solve(fileName: string, days: number) {
  const { template, rules } = readDay14Input(fileName);

  let pairsMap = times(template.length - 1).reduce((acc, _v, index) => {
    const pair = template[index] + template[index + 1];
    return {
      ...acc,
      [pair]: (acc[pair] ?? 0) + 1,
    };
  }, {} as PairMap);

  times(days).forEach(() => {
    pairsMap = passRound(pairsMap, rules);
  });

  return findResult(pairsMap, template[template.length - 1]);
}

console.log('Solution puzzle1:', solve('./input', 10));
console.log('Solution puzzle2:', solve('./input', 40));
