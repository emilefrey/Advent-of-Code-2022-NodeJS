var helpers = require("./helpers");

const processInput = (inputRows, nodes) => {
  const startEnd = {};
  inputRows.forEach((inputRow, inputRowIndex) =>
    inputRow.forEach((inputRowItem, inputColumnIndex) => {
      const nodeString = `${inputRowIndex}/${inputColumnIndex}`;
      nodes[nodeString] = {
        value: parseInt(inputRowItem),
        nodeString: nodeString,
        neighbors: [],
        visited: false,
        previous: null,
      };

      if (inputRowItem === 83) {
        const start = nodes[`${inputRowIndex}/${inputColumnIndex}`];
        start.value = 97;
        startEnd["start"] = start;
      } else if (inputRowItem === 69) {
        const end = nodes[`${inputRowIndex}/${inputColumnIndex}`];
        end.value = 122;
        startEnd["end"] = end;
      }
    })
  );
  return startEnd;
};

const getNeighbors = (nodeString, nodeInfo, nodes) => {
  const [row, column] = nodeString.split("/").map(Number);
  const neighbors = [];
  const upNode = nodes[`${row - 1}/${column}`];
  const downNode = nodes[`${row + 1}/${column}`];
  const leftNode = nodes[`${row}/${column - 1}`];
  const rightNode = nodes[`${row}/${column + 1}`];
  if (upNode?.value - nodeInfo.value <= 1) {
    neighbors.push(upNode);
  }
  if (downNode?.value - nodeInfo.value <= 1) {
    neighbors.push(downNode);
  }
  if (rightNode?.value - nodeInfo.value <= 1) {
    neighbors.push(rightNode);
  }
  if (leftNode?.value - nodeInfo.value <= 1) {
    neighbors.push(leftNode);
  }

  nodeInfo.neighbors = neighbors;
};

const bfs = (start, end) => {
  let queue = [];
  start.visited = true;
  queue.push(start);
  while (queue.length > 0) {
    const current = queue.pop();
    for (let i = 0; i < current.neighbors.length; i++) {
      const neighbor = current.neighbors[i];
      if (!neighbor.visited) {
        neighbor.visited = true;
        queue.push(neighbor);
        neighbor.previous = current;
        if (neighbor === end) {
          queue = [];
          break;
        }
      }
    }
  }
  return traceRoute(end);
};

const traceRoute = (end) => {
  let node = end;
  const route = [];
  while (node) {
    route.push(node);
    node = node.previous;
  }
  console.log(route.reverse().map((a) => a.nodeString));
  return route.length - 1;
};

const part1 = (data) => {
  const inputRows = helpers
    .splitByNewLine(data)
    .map((inputLine) => inputLine.split("").map((char) => char.charCodeAt(0)));
  const nodes = {};
  const { start, end } = processInput(inputRows, nodes);

  Object.entries(nodes).forEach(([nodeString, nodeInfo]) => {
    getNeighbors(nodeString, nodeInfo, nodes);
  });

  return bfs(start, end);
};

const part2 = (data) => {
  return "TODO ";
};

module.exports = {
  part1,
  part2,
};

// 1025/1024/1020 is too high
