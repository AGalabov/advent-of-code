export interface NodeVertex {
  nameOfVertex: string;
  weight: number;
}

export class Vertex {
  name: string;
  nodes: NodeVertex[];
  weight: number;

  constructor(theName: string, theNodes: NodeVertex[], theWeight: number) {
    this.name = theName;
    this.nodes = theNodes;
    this.weight = theWeight;
  }
}

export class Dijkstra {
  vertices: any;
  constructor() {
    this.vertices = {};
  }

  addVertex(vertex: Vertex): void {
    this.vertices[vertex.name] = vertex;
  }

  findPointsOfShortestWay(
    start: string,
    finish: string,
    weight: number
  ): string[] {
    let nextVertex: string = finish;
    let arrayWithVertex: string[] = [];
    let fixedVertices: string[] = [finish];
    while (nextVertex !== start) {
      let minWeigth: number = Number.MAX_VALUE;
      let minVertex: string = '';
      // console.log('Checking for', minVertex, this.vertices[nextVertex]);
      for (let i of this.vertices[nextVertex].nodes) {
        if (
          i.weight + this.vertices[i.nameOfVertex].weight < minWeigth &&
          !fixedVertices.includes(i.nameOfVertex)
        ) {
          minWeigth = this.vertices[i.nameOfVertex].weight;
          minVertex = i.nameOfVertex;
        }
      }
      console.log('Will push', minVertex, minWeigth);
      fixedVertices.push(minVertex);
      arrayWithVertex.push(minVertex);
      nextVertex = minVertex;
    }
    return arrayWithVertex;
  }

  findShortestWay(start: string, finish: string): number {
    let nodes: Record<string, number> = {};
    // let visitedVertex: string[] = [];

    for (let i in this.vertices) {
      nodes[i] = i === start ? 0 : Number.MAX_VALUE;
    }

    while (Object.keys(nodes).length > 0) {
      let sortedVisitedByWeight: string[] = Object.keys(nodes).sort(
        (a, b) => nodes[a] - nodes[b]
      );
      const unvisited = sortedVisitedByWeight[0];

      if (unvisited === finish) {
        return nodes[unvisited];
      }

      // console.log('Unvisited', unvisited, nodes[unvisited]);
      let currentVertex: Vertex = this.vertices[unvisited];

      for (let j of currentVertex.nodes) {
        const calculateWeight: number = nodes[unvisited] + j.weight;
        // console.log({ calculateWeight, currentVertex, j });
        if (calculateWeight < nodes[j.nameOfVertex]) {
          nodes[j.nameOfVertex] = calculateWeight;
        }
      }

      delete nodes[unvisited];
    }

    // console.log({ nodes });

    return nodes[finish];

    // console.log({ finish, vertex: this.vertices[finish] });
    // const finishWeight: number = this.vertices[finish].weight;
    // let arrayWithVertex: string[] = this.findPointsOfShortestWay(
    //   start,
    //   finish,
    //   finishWeight
    // ).reverse();
    // arrayWithVertex.push(finish, finishWeight.toString());
    // return arrayWithVertex;
  }
}
