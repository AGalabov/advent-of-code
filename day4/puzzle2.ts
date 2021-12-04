import { times, flatten, sum } from 'lodash';
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
  let cardNumbersInPlay = cards.map((_c, i) => i);

  for (const n of numbers) {
    occurrencesMap[n] = findOccurrences(n);

    if (cardNumbersInPlay.length === 1) {
      if (checkCard(cardNumbersInPlay[0])) {
        console.log(
          'Looser',
          cardNumbersInPlay[0],
          cards[cardNumbersInPlay[0]]
        );

        const score = calculateScore(cardNumbersInPlay[0], n);
        console.log('Score', score);
        return;
      }
    } else {
      cardNumbersInPlay = cardNumbersInPlay.filter(
        (cardId) => !checkCard(cardId)
      );
    }
  }
}

playBingo();
