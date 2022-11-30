import { reverse } from 'lodash';
import { readInput } from '../utils';

function isOpeningBracket(c: string) {
  return c === '(' || c === '[' || c === '<' || c === '{';
}

function isMatchingClosingBracket(opening: string, closing: string) {
  switch (opening) {
    case '(':
      return closing === ')';
    case '{':
      return closing === '}';
    case '[':
      return closing === ']';
    case '<':
      return closing === '>';
    default:
      console.log({ opening });
      throw new Error('Unexpected opening symbol');
  }
}

function getErrorCharacter(line: string): string | undefined {
  const stack: string[] = [];

  let errorCharacter: string | undefined;

  line.split('').forEach((c) => {
    if (isOpeningBracket(c)) {
      stack.push(c);
    } else {
      const lastOpening = stack.pop();
      if (!lastOpening) {
        // return lastOpening
        throw new Error('Closing character with no opening one');
      }
      if (!isMatchingClosingBracket(lastOpening, c)) {
        errorCharacter = c;
      }
    }
  });
  return errorCharacter;
}

function getCompletionSymbolScore(opening: string) {
  switch (opening) {
    case '(':
      return 1;
    case '[':
      return 2;
    case '{':
      return 3;
    case '<':
      return 4;
    default:
      throw new Error('Unexpected opening symbol to complete');
  }
}

function getCompletionScore(line: string): number {
  const stack: string[] = [];

  line.split('').forEach((c) => {
    if (isOpeningBracket(c)) {
      stack.push(c);
    } else {
      const lastOpening = stack.pop();
      if (!lastOpening) {
        throw new Error('Closing character with no opening one');
      }
      if (!isMatchingClosingBracket(lastOpening, c)) {
        throw new Error('Incorrect closing character');
      }
    }
  });

  return reverse(stack).reduce((acc, c) => {
    const score = getCompletionSymbolScore(c);
    return acc * 5 + score;
  }, 0);
}

function solve(fileName: string) {
  const input = readInput(fileName);

  const incompleteLines = input.filter(
    (line) => getErrorCharacter(line) === undefined
  );

  const middle = (incompleteLines.length - 1) / 2;
  const scores = incompleteLines.map(getCompletionScore).sort((a, b) => a - b);

  return scores[middle];
}

console.log('Solution:', solve('./input'));
