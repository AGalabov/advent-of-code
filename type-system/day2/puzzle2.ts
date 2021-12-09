import { Length, Minus, Multiply, Plus, Rest, Zero } from '../lib';
import { CourseCommand, Day2Sample } from './input';

interface Solution {
  horizontal: number;
  depth: number;
  aim: number;
}

type CalculateCommandResult<
  T extends CourseCommand,
  Accumulated extends Solution
> = T[0] extends 'forward'
  ? {
      horizontal: Plus<Accumulated['horizontal'], T[1]>;
      depth: Plus<Accumulated['depth'], Multiply<Accumulated['aim'], T[1]>>;
      aim: Accumulated['aim'];
    }
  : T[0] extends 'up'
  ? {
      horizontal: Accumulated['horizontal'];
      depth: Accumulated['depth'];
      aim: Minus<Accumulated['aim'], T[1]>;
    }
  : T[0] extends 'down'
  ? {
      horizontal: Accumulated['horizontal'];
      depth: Accumulated['depth'];
      aim: Plus<Accumulated['aim'], T[1]>;
    }
  : Accumulated;

type CalculateCourseDistance<
  T extends CourseCommand[],
  Accumulated extends Solution = {
    horizontal: Length<Zero>;
    depth: Length<Zero>;
    aim: Length<Zero>;
  }
> = T extends []
  ? Multiply<Accumulated['depth'], Accumulated['horizontal']>
  : CalculateCourseDistance<Rest<T>, CalculateCommandResult<T[0], Accumulated>>;

type SolutionDay2Puzzle2Sample = CalculateCourseDistance<Day2Sample>;
