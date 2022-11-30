import _, { times, flatten, findIndex, sum } from 'lodash';
import { readDay4Input } from './common';

const { numbers, cards } = readDay4Input('./input');

type OccurrencesMap = Record<number, number[]>;
const occurrencesMap: OccurrencesMap = {};

function checkArray(array: number[], cardId: number) {
  return array.every((n) => occurrencesMap[n]?.includes(cardId) ?? false);
}

function checkCard(cardId: number) {
  const card = cards[cardId];
  return (
    card.some((row) => checkArray(row, cardId)) ||
    times(5)
      .map((_, i) => card.map((row) => row[i]))
      .some((arr) => checkArray(arr, cardId))
  );
}

function findOccurrences(bingoN: number) {
  const test = cards.map(flatten).map((numbers, cardId) => {
    const hasMatch = numbers.includes(bingoN);

    return hasMatch ? cardId : undefined;
  });

  return test.filter((e) => e !== undefined) as number[];
}

function calculateScore(cardId: number, winningNumber: number) {
  let score = sum(flatten(cards[cardId]));

  for (const n of numbers) {
    if (occurrencesMap[n]?.includes(cardId)) {
      score -= n;
    }

    if (n === winningNumber) {
      console.log(winningNumber, score);
      return winningNumber * score;
    }
  }
}

function playBingo() {
  for (const n of numbers) {
    occurrencesMap[n] = findOccurrences(n);

    const winnerId = findIndex(cards, (_card, index) => checkCard(index));

    if (winnerId >= 0) {
      console.log('Winner:', winnerId, cards[winnerId]);

      const score = calculateScore(winnerId, n);

      console.log('Score', score);
      return;
    }
  }
}

playBingo();
