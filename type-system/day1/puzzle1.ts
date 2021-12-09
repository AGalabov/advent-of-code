import { GreaterThan, Length, PlusOne, RestFromArray, Zero } from '../lib';
import { Full, Day1Sample } from './input';

type NumberOfIncreases<
  Input extends number[],
  Previous extends number | null = null,
  Accumulator extends number = Length<Zero>
> = Input extends []
  ? Accumulator
  : Previous extends number
  ? GreaterThan<Input[0], Previous> extends true
    ? NumberOfIncreases<RestFromArray<Input>, Input[0], PlusOne<Accumulator>>
    : NumberOfIncreases<RestFromArray<Input>, Input[0], Accumulator>
  : NumberOfIncreases<RestFromArray<Input>, Input[0], Accumulator>;

type Day1SolutionSample = NumberOfIncreases<Day1Sample>;
type Day1SolutionFull = NumberOfIncreases<Full>;
