import { GreaterThan, Length, PlusOne, Rest, Zero } from '../lib';
import { Day1Sample } from './input';

type NumberOfIncreases<
  Input extends number[],
  Previous extends number | null = null,
  Accumulator extends number = Length<Zero>
> = Input extends []
  ? Accumulator
  : Previous extends number
  ? GreaterThan<Input[0], Previous> extends true
    ? NumberOfIncreases<Rest<Input>, Input[0], PlusOne<Accumulator>>
    : NumberOfIncreases<Rest<Input>, Input[0], Accumulator>
  : NumberOfIncreases<Rest<Input>, Input[0], Accumulator>;

type Solution = NumberOfIncreases<Day1Sample>;
