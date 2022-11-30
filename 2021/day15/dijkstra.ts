import PriorityQueue from 'ts-priority-queue';

export interface Edge {
  to: string;
  weight: number;
}

interface Vertex {
  name: string;
  nodes: Edge[];
}

interface PriorityVertex {
  priority: number;
  vertex: Vertex;
}

export class Dijkstra {
  private vertices: Record<string, Vertex>;

  constructor() {
    this.vertices = {};
  }

  addVertex(vertex: Vertex): void {
    this.vertices[vertex.name] = vertex;
  }

  findShortestWay(start: string, finish: string): number {
    const nodeCosts: Record<string, number> = {};

    const priorityQueue = new PriorityQueue({
      comparator: (a: PriorityVertex, b: PriorityVertex) =>
        a.priority - b.priority,
    });

    priorityQueue.queue({ vertex: this.vertices[start], priority: 0 });

    Object.keys(this.vertices).forEach((key) => {
      nodeCosts[key] = key === start ? 0 : Number.MAX_VALUE;
    });

    while (priorityQueue.length > 0) {
      const { vertex: currentVertex } = priorityQueue.dequeue();

      if (currentVertex.name === finish) {
        return nodeCosts[finish];
      }

      currentVertex.nodes.forEach((adjacent) => {
        const calculatedWeight =
          nodeCosts[currentVertex.name] + adjacent.weight;

        if (calculatedWeight < nodeCosts[adjacent.to]) {
          nodeCosts[adjacent.to] = calculatedWeight;
          priorityQueue.queue({
            vertex: this.vertices[adjacent.to],
            priority: calculatedWeight,
          });
        }
      });
    }

    return -1;
  }
}
