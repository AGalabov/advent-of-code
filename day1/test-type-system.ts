type Tuple = any[];
type Zero = [];

type RestFromArray<T extends Tuple> = ((...args: T) => void) extends (
  first: any,
  ...rest: infer Rest
) => void
  ? Rest
  : [];
// type Rest = RestFromArray<[string, number, { test: boolean }]>;
// type Rest2 = RestFromArray<[1, 2, 3]>;

type Length<T extends Tuple> = T extends { length: infer L }
  ? L extends number
    ? L
    : Length<Zero>
  : Length<Zero>;

type BuildTuple<N extends number, T extends Tuple = Zero> = T extends {
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
  : T extends [unknown, ...infer Rest]
  ? Length<Rest>
  : Length<Zero>;
type Thirteen = MinusOne<14>;

type Minus<
  A extends number,
  B extends number,
  T = BuildTuple<A>
> = T extends Zero
  ? Length<Zero>
  : T extends [...infer Rest, ...BuildTuple<B>]
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

type Greater = GreaterThan<5, 3>; // Greater is of type true
type Equal = GreaterThan<5, 5>; // Equal is of type false
type Smaller = GreaterThan<3, 5>; // Smaller is of type false

type Sample = [1, 2, 4, 3, 6, 5, 7, 8, 5, 6];

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

type Solution = NumberOfIncreases<Sample>;
