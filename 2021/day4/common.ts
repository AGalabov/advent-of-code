import { trim } from 'lodash';
import { readInput } from '../utils';

export function readDay4Input(fileName: string) {
  const [numbersInput, ...cardsInput] = readInput(fileName);

  const numbers = numbersInput.split(',').map((input) => parseInt(input));
  const { cardsArr: cards } = cardsInput.reduce(
    (acc, row, rowI) => {
      if (row === '') {
        if (acc.currCard.length > 0) {
          acc.cardsArr.push(acc.currCard);
          acc.currCard = [];
        }
        return acc;
      }
      const rowV = trim(row)
        .split(/[ ]+/)
        .map((input) => parseInt(input));
      acc.currCard.push(rowV);

      if (rowI === cardsInput.length - 1) {
        acc.cardsArr.push(acc.currCard);
      }

      return acc;
    },
    { cardsArr: [] as number[][][], currCard: [] as number[][] }
  );

  return { numbers, cards };
}
