var helpers = require("./helpers");

const moveHead = (head, direction) => {
  if (direction === "R") {
    head.xPos += 1;
  } else if (direction === "L") {
    head.xPos -= 1;
  } else if (direction === "D") {
    head.yPos -= 1;
  } else {
    head.yPos += 1;
  }
};

const moveTail = (tail, head) => {
  let tailXMoved = false;
  let tailYMoved = false;
  if (Math.abs(head.xPos - tail.xPos) > 1) {
    if (head.xPos - tail.xPos > 1) {
      tail.xPos += 1;
    } else {
      tail.xPos -= 1;
    }
    tailXMoved = true;
  } else if (Math.abs(head.yPos - tail.yPos) > 1) {
    if (head.yPos - tail.yPos > 1) {
      tail.yPos += 1;
    } else {
      tail.yPos -= 1;
    }
    tailYMoved = true;
  }

  if (tailYMoved) {
    tail.xPos = head.xPos;
  } else if (tailXMoved) {
    tail.yPos = head.yPos;
  }
  return { tailX: tail.xPos, tailY: tail.yPos };
};

const part1 = (data) => {
  let head = { xPos: 0, yPos: 0 };
  let tail = { xPos: 0, yPos: 0 };
  let tailPositionsVisited = new Set([`${tail.xPos}/${tail.yPos}`]);
  const stuff = helpers.splitByNewLine(data);
  stuff.forEach((command) => {
    let [direction, amount] = command.split(" ");
    amount = parseInt(amount);
    for (let i = 0; i < amount; i++) {
      moveHead(head, direction);
      const { tailX, tailY } = moveTail(tail, head, tailPositionsVisited);
      tailPositionsVisited.add(`${tailX}/${tailY}`);
    }
  });
  return tailPositionsVisited.size;
};

const part2 = (data) => {
  const knots = [
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
    { xPos: 0, yPos: 0 },
  ];

  const tailPositionsVisited = new Set([`${knots[9].xPos}/${knots[9].yPos}`]);
  const stuff = helpers.splitByNewLine(data);
  stuff.forEach((command) => {
    let [direction, amount] = command.split(" ");
    amount = parseInt(amount);
    for (let i = 0; i < amount; i++) {
      moveHead(knots[0], direction);
      for (let i = 1; i < knots.length; i++) {
        moveTail(knots[i], knots[i - 1]);
      }
      tailPositionsVisited.add(`${knots[9].xPos}/${knots[9].yPos}`);
    }
  });
  return tailPositionsVisited.size;
};

module.exports = {
  part1,
  part2,
};
