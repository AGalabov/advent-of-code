import { readInput } from '../utils';

export interface Rule {
  input: string;
  result: string;
}

function toRule(inputData: string): Rule {
  const [input, result] = inputData.split(' -> ');
  return { input, result };
}

export function readDay14Input(fileName: string) {
  const input = readInput(fileName);

  const template = input[0];
  const rulesInput = input.slice(2);

  const rules = rulesInput.map(toRule);

  return { template, rules };
}
