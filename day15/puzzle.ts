import { compact } from 'lodash';
import { getDay15Puzzle1Input, getDay15Puzzle2Input } from './common';
import { Dijkstra, Edge } from './dijkstra';

function getVertexName(rowIndex: number, columnIndex: number) {
  return `${rowIndex},${columnIndex}`;
}

function getEdge(
  rowIndex: number,
  columnIndex: number,
  matrix: number[][]
): Edge {
  return {
    to: getVertexName(rowIndex, columnIndex),
    weight: matrix[rowIndex][columnIndex],
  };
}

function getEdges(
  matrix: number[][],
  rowIndex: number,
  colIndex: number
): Edge[] {
  const top =
    rowIndex > 0 ? getEdge(rowIndex - 1, colIndex, matrix) : undefined;

  const bottom =
    rowIndex < matrix.length - 1
      ? getEdge(rowIndex + 1, colIndex, matrix)
      : undefined;

  const left =
    colIndex > 0 ? getEdge(rowIndex, colIndex - 1, matrix) : undefined;

  const right =
    colIndex < matrix[0].length - 1
      ? getEdge(rowIndex, colIndex + 1, matrix)
      : undefined;

  return compact([top, bottom, left, right]);
}

function solve(matrix: number[][]) {
  const dijkstra = new Dijkstra();

  matrix.forEach((row, rI) => {
    row.forEach((_col, cI) => {
      dijkstra.addVertex({
        name: getVertexName(rI, cI),
        nodes: getEdges(matrix, rI, cI),
      });
    });
  });

  const path = dijkstra.findShortestWay(
    getVertexName(0, 0),
    getVertexName(matrix.length - 1, matrix[0].length - 1)
  );
  return path;
}

console.log('Solution1:', solve(getDay15Puzzle1Input('./input')));
console.log('Solution2:', solve(getDay15Puzzle2Input('./input')));
