import { readInput } from '../utils';

class CaveMap {
  private caveRoutes: Map<string, string[]>;

  constructor() {
    this.caveRoutes = new Map();
  }

  addLink(cave1: string, cave2: string) {
    const routesCave1 = this.caveRoutes.get(cave1) ?? [];
    this.caveRoutes.set(cave1, [...routesCave1, cave2]);

    const routesCave2 = this.caveRoutes.get(cave2) ?? [];
    this.caveRoutes.set(cave2, [...routesCave2, cave1]);
  }

  findPaths() {
    return this.findPathsRecursive('start', [], false);
  }

  private findPathsRecursive(
    from: string,
    usedSmallCaves: string[],
    haveUsedASmallCaveTwice: boolean
  ): number {
    let visitedSmallCaves = [...usedSmallCaves];
    let didUseSmallCaveASecondTime = false;

    if (/^[a-z]+$/.test(from)) {
      if (usedSmallCaves.includes(from)) {
        if (haveUsedASmallCaveTwice || from === 'start') {
          return 0;
        } else {
          didUseSmallCaveASecondTime = true;
        }
      }
      visitedSmallCaves.push(from);
    }

    if (from === 'end') {
      return 1;
    }

    const caves = this.caveRoutes.get(from);

    if (!caves) {
      throw new Error('Initial cave name not linked to other caves');
    }

    return caves.reduce((acc, curr) => {
      return (
        acc +
        this.findPathsRecursive(
          curr,
          visitedSmallCaves,
          haveUsedASmallCaveTwice || didUseSmallCaveASecondTime
        )
      );
    }, 0);
  }
}

function solve(fileName: string) {
  const input = readInput(fileName);

  const caveMap = new CaveMap();

  input.forEach((line) => {
    const [cave1, cave2] = line.split('-');
    caveMap.addLink(cave1, cave2);
  });

  return caveMap.findPaths();
}

console.log('Solution:', solve('./input'));
