type Tuple = readonly any[] | any[];
type Zero = [];

type RestFromArray<T extends Tuple> = ((...args: T) => void) extends (
  first: any,
  ...rest: infer Rest
) => void
  ? Rest
  : [];
// type Rest = RestFromArray<[string, number, { test: boolean }]>

type Length<T> = T extends { length: infer L } ? L : Length<Zero>;
type BuildTuple<N extends number, T extends Tuple = []> = T extends {
  length: N;
}
  ? T
  : BuildTuple<N, [...T, any]>;
// TS has it's limitation when it comes to recursive depth:
// type UnderLimit = BuildTuple<46>;
// type AboveLimit = BuildTuple<47>;

// Arithmetics

type PlusOne<A extends number> = Length<[...BuildTuple<A>, any]>;
// type Twenty = PlusOne<19>;

type Plus<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;
// type Six = Sum<4, 2>;

type MinusOne<N extends number, T = BuildTuple<N>> = T extends Zero
  ? Length<Zero>
  : T extends [...infer Rest, any]
  ? Length<Rest>
  : Length<Zero>;
// type Thirteen = MinusOne<14>

type Minus<A extends number, B extends number> = BuildTuple<A> extends [
  ...infer Rest,
  ...BuildTuple<B>
]
  ? Length<Rest>
  : Length<Zero>;
// type Four = Minus<6, 2>;

type GreaterThan<
  A extends number,
  B extends number
> = BuildTuple<B> extends Zero
  ? BuildTuple<A> extends Zero
    ? false
    : true
  : GreaterThan<MinusOne<A>, MinusOne<B>>;
// type GT = GreaterThan<5, 6>;
// type Six = PlusOne<5>
// type GT = GreaterThan<Six, 5>;

type Sample = [1, 2, 3, 4, 5, 6, 21, 8, 9, 10, 11];

type NumberOfIncreases<
  Input extends number[],
  Previous extends number = Length<Zero>,
  Accumulator extends number = MinusOne<Length<Input>>
> = Input extends []
  ? Accumulator
  : Input extends [infer Curr, ...any]
  ? Curr extends number
    ? GreaterThan<Curr, Previous> extends true
      ? NumberOfIncreases<RestFromArray<Input>, Curr, Accumulator>
      : NumberOfIncreases<RestFromArray<Input>, Curr, MinusOne<Accumulator>>
    : Accumulator
  : Accumulator;

type Solution = NumberOfIncreases<Sample>;
