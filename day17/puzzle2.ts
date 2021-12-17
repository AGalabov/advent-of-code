import { times } from 'lodash';
import { readDay17Input, Target } from './common';

function findMinimumX(closestX: number) {
  let minX = 0;
  let sum = 0;
  while (sum < closestX) {
    minX++;
    sum += minX;
  }
  return minX;
}

function wouldLand(velocityX: number, velocityY: number, target: Target) {
  let positionX = 0,
    positionY = 0;
  let currentXVelocity = velocityX;
  let currentYVelocity = velocityY;
  while (true) {
    if (
      positionX >= target.closestX &&
      positionX <= target.furthestX &&
      positionY >= target.lowestY &&
      positionY <= target.highestY
    ) {
      return true;
    }

    if (
      positionX > target.furthestX ||
      (velocityX === 0 && positionX < target.closestX)
    ) {
      return false;
    }

    if (positionY < target.lowestY) {
      return false;
    }

    positionX += currentXVelocity;
    positionY += currentYVelocity;

    currentXVelocity = currentXVelocity === 0 ? 0 : currentXVelocity - 1;
    currentYVelocity--;
  }
}

function solve(fileName: string) {
  const target = readDay17Input(fileName);

  const minimumX = findMinimumX(target.closestX);

  const maximumY = Math.abs(target.lowestY);
  const minimumY = target.lowestY < 0 ? target.lowestY : target.highestY;

  let acc = 0;

  // A little bit of brute force. The 300 here is estimated based
  // on my input. After some point we are not finding any more solutions
  times(300).forEach((_a, xIndex) => {
    times(maximumY - minimumY).forEach((_c, yIndex) => {
      if (wouldLand(minimumX + xIndex, minimumY + yIndex, target)) {
        acc++;
      }
    });
  });

  return acc;
}

console.log('Solution:', solve('./input'));
