import { GreaterThan, Length, PlusOne, Rest, Zero } from '../lib';
import { Day1Sample } from './input';

type NumberOfBatchedIncreases<
  Input extends number[],
  Accumulator extends number = Length<Zero>
> = Input extends { length: infer L }
  ? L extends number
    ? GreaterThan<L, 3> extends true
      ? GreaterThan<Input[2], Input[0]> extends true
        ? NumberOfBatchedIncreases<Rest<Input>, PlusOne<Accumulator>>
        : NumberOfBatchedIncreases<Rest<Input>, Accumulator>
      : Accumulator
    : Accumulator
  : Accumulator;

type Solution = NumberOfBatchedIncreases<Day1Sample>;
