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

const getNeighborsPart2 = (nodeString, nodeInfo, nodes) => {
  const [row, column] = nodeString.split("/").map(Number);
  const neighbors = [];
  const upNode = nodes[`${row - 1}/${column}`];
  const downNode = nodes[`${row + 1}/${column}`];
  const leftNode = nodes[`${row}/${column - 1}`];
  const rightNode = nodes[`${row}/${column + 1}`];
  if (nodeInfo.value - upNode?.value <= 1) {
    neighbors.push(upNode);
  }
  if (nodeInfo.value - downNode?.value <= 1) {
    neighbors.push(downNode);
  }
  if (nodeInfo.value - rightNode?.value <= 1) {
    neighbors.push(rightNode);
  }
  if (nodeInfo.value - leftNode?.value <= 1) {
    neighbors.push(leftNode);
  }

  nodeInfo.neighbors = neighbors;
};

const bfs = (start, end) => {
  let queue = [];
  start.visited = true;
  queue.push(start);
  while (queue.length > 0) {
    const current = queue.shift();
    for (let i = 0; i < current.neighbors.length; i++) {
      const neighbor = current.neighbors[i];
      if (!neighbor.visited) {
        neighbor.visited = true;
        neighbor.previous = current;
        queue.push(neighbor);
        if (neighbor === end) {
          queue = [];
          break;
        }
      }
    }
  }
  return getRouteLength(end);
};

const bfsPart2 = (start) => {
  let queue = [];
  start.visited = true;
  queue.push(start);
  let end;
  while (queue.length > 0) {
    const current = queue.shift();
    for (let i = 0; i < current.neighbors.length; i++) {
      const neighbor = current.neighbors[i];
      if (!neighbor.visited) {
        neighbor.visited = true;
        neighbor.previous = current;
        queue.push(neighbor);
        if (neighbor.value === 97) {
          end = neighbor;
          queue = [];
          break;
        }
      }
    }
  }
  return getRouteLength(end);
};

const getRouteLength = (end) => {
  let node = end;
  const route = [];
  while (node) {
    route.push(node);
    node = node.previous;
  }
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
  const inputRows = helpers
    .splitByNewLine(data)
    .map((inputLine) => inputLine.split("").map((char) => char.charCodeAt(0)));
  const nodes = {};
  const { start, end } = processInput(inputRows, nodes);

  Object.entries(nodes).forEach(([nodeString, nodeInfo]) => {
    getNeighborsPart2(nodeString, nodeInfo, nodes);
  });

  return bfsPart2(end, start);
};

module.exports = {
  part1,
  part2,
};

// 1025/1024/1020 is too high
