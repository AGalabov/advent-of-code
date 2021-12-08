import { readInput } from '../utils';

class NumberDecoder {
  private signalsForSeven?: string[];
  private signalsForFour?: string[];

  constructor() {}

  readSignals(signals: string[]) {
    const four = signals.find((signal) => signal.length === 4);
    const seven = signals.find((signal) => signal.length === 3);

    if (!four || !seven) {
      throw new Error(
        'An unexpected error occurred! Will not be able to deduce'
      );
    }
    this.signalsForFour = four.split('');
    this.signalsForSeven = seven.split('');
  }

  decodeNumber(digits: string[]) {
    const numberAsString = digits
      .map((digitSignals) => this.decodeDigit(digitSignals))
      .join('');
    return parseInt(numberAsString);
  }

  private containsSegmentsOfSeven(signals: string) {
    if (!this.signalsForSeven) {
      throw new Error('Cannot deduce number. Insufficient data');
    }
    const intersections = this.signalsForSeven.filter((signal) =>
      signals.includes(signal)
    ).length;

    return {
      intersections,
      completeMatch: intersections === this.signalsForSeven.length,
    };
  }

  private containsSegmentsOfFour(signals: string) {
    if (!this.signalsForFour) {
      throw new Error('Cannot deduce number. Insufficient data');
    }
    const intersections = this.signalsForFour.filter((signal) =>
      signals.includes(signal)
    ).length;

    return {
      intersections,
      completeMatch: intersections === this.signalsForFour.length,
    };
  }

  private decodeDigit(signals: string) {
    switch (signals.length) {
      case 2:
        return 1;
      case 3:
        return 7;
      case 4:
        return 4;
      case 7:
        return 8;
      case 5:
        if (this.containsSegmentsOfSeven(signals).completeMatch) {
          return 3;
        }

        if (this.containsSegmentsOfFour(signals).intersections === 3) {
          return 5;
        }
        return 2;
      case 6:
        if (!this.containsSegmentsOfSeven(signals).completeMatch) {
          return 6;
        }

        if (this.containsSegmentsOfFour(signals).completeMatch) {
          return 9;
        }
        return 0;
      default:
        throw new Error(
          'InvalidInput - number of active segments should be between 2 and 7'
        );
    }
  }
}

function solve(fileName: string) {
  const input = readInput(fileName);

  const decoder = new NumberDecoder();

  let sum = 0;

  input.forEach((line) => {
    const [signalsString, resultsString] = line.split(' | ');
    const signals = signalsString.split(' ');
    const digits = resultsString.split(' ');

    decoder.readSignals(signals);

    sum += decoder.decodeNumber(digits);
  });

  console.log('Solution:', sum);
}

solve('input');
