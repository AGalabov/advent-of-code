import { compact } from 'lodash';
import { parse } from 'path/posix';
import { readInput } from '../utils';
import { Dijkstra, NodeVertex, Vertex } from './dijkstra';

function getVertices(
  matrix: number[][],
  rowIndex: number,
  colIndex: number
): NodeVertex[] {
  // console.log({ rowIndex, compareWIth: matrix.length - 1 });

  const top: NodeVertex | undefined =
    rowIndex > 0
      ? {
          nameOfVertex: `${rowIndex - 1},${colIndex}`,
          weight: matrix[rowIndex - 1][colIndex],
        }
      : undefined;

  const bottom: NodeVertex | undefined =
    rowIndex < matrix.length - 1
      ? {
          nameOfVertex: `${rowIndex + 1},${colIndex}`,
          weight: matrix[rowIndex + 1][colIndex],
        }
      : undefined;

  const left: NodeVertex | undefined =
    colIndex > 0
      ? {
          nameOfVertex: `${rowIndex},${colIndex - 1}`,
          weight: matrix[rowIndex][colIndex - 1],
        }
      : undefined;

  const right: NodeVertex | undefined =
    colIndex < matrix[0].length - 1
      ? {
          nameOfVertex: `${rowIndex},${colIndex + 1}`,
          weight: matrix[rowIndex][colIndex + 1],
        }
      : undefined;

  // console.log(
  //   `For ${rowIndex}${colIndex}:`,
  //   compact([top, bottom, left, right])
  // );

  return compact([top, bottom, left, right]);
}

function solve(fileName: string) {
  const input = readInput(fileName);

  const matrix = input.map((line) =>
    line.split('').map((num) => parseInt(num))
  );

  const dijkstra = new Dijkstra();

  matrix.forEach((row, rI) => {
    row.forEach((col, cI) => {
      dijkstra.addVertex(
        new Vertex(`${rI},${cI}`, getVertices(matrix, rI, cI), col)
      );
    });
  });

  const path = dijkstra.findShortestWay(
    '0,0',
    `${matrix.length - 1},${matrix[0].length - 1}`
  );
  return path;
}

console.log('Solution:', solve('./input'));
