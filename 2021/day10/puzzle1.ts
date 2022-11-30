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
        throw new Error('Closing character with no opening one');
      }
      if (!isMatchingClosingBracket(lastOpening, c)) {
        errorCharacter = c;
      }
    }
  });
  return errorCharacter;
}

function getCharacterScore(closing: string) {
  switch (closing) {
    case ')':
      return 3;
    case ']':
      return 57;
    case '}':
      return 1197;
    case '>':
      return 25137;
    default:
      throw new Error('Unexpected closing symbol');
  }
}

function solve(fileName: string) {
  const input = readInput(fileName);

  const score = input.reduce((acc, current) => {
    const character = getErrorCharacter(current);
    if (character) {
      return acc + getCharacterScore(character);
    }
    return acc;
  }, 0);

  return score;
}

console.log('Solution:', solve('./input'));
