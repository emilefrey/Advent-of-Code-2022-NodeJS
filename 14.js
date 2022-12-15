var helpers = require("./helpers");

// NEEDS SOME SERIOUS LOVE (AKA REFACTORING...AKA REMOVE TONS OF REDUNDANT CODE)

const generateWalls = (wallData, wallSet) => {
  let lowestPoint = 0;
  wallData.forEach((wall) => {
    const coordinates = wall.split(" -> ");
    for (
      let coordinate = 0;
      coordinate < coordinates.length - 1;
      coordinate++
    ) {
      const [x1, y1] = coordinates[coordinate].split(",")?.map(Number);
      const [x2, y2] = coordinates[coordinate + 1].split(",")?.map(Number);

      if (x1 === x2) {
        if (y2 - y1 > 0) {
          for (let i = y1; i <= y2; i++) {
            wallSet.add(`${x1},${i}`);
            lowestPoint = i > lowestPoint ? i : lowestPoint;
          }
        } else {
          for (let i = y2; i <= y1; i++) {
            wallSet.add(`${x1},${i}`);
            lowestPoint = i > lowestPoint ? i : lowestPoint;
          }
        }
      } else if (y1 === y2) {
        if (x2 - x1 > 0) {
          for (let i = x1; i <= x2; i++) {
            wallSet.add(`${i},${y1}`);
            lowestPoint = y1 > lowestPoint ? y1 : lowestPoint;
          }
        } else {
          for (let i = x2; i <= x1; i++) {
            wallSet.add(`${i},${y1}`);
            lowestPoint = y1 > lowestPoint ? y1 : lowestPoint;
          }
        }
      }
    }
  });
  return lowestPoint;
};

const dropSand = (blockers, lowestPoint, part2 = false) => {
  let x = 500;
  let y = 0;

  while (y < lowestPoint + part2 ? 2 : 0) {
    if (!blockers.has(`${x},${y + 1}`)) {
      y++;
      continue;
    } else if (!blockers.has(`${x - 1},${y + 1}`)) {
      x--;
      y++;
      continue;
    } else if (!blockers.has(`${x + 1},${y + 1}`)) {
      x++;
      y++;
      continue;
    }
    break;
  }
  return { x: x, y: y };
};

const part1 = (data) => {
  const walls = helpers.splitByNewLine(data);
  const blockers = new Set();
  const lowestPoint = generateWalls(walls, blockers);
  const wallsSize = blockers.size;
  while (true) {
    const { x, y } = dropSand(blockers, lowestPoint);
    if (y >= lowestPoint) {
      break;
    } else {
      blockers.add(`${x},${y}`);
    }
  }

  return blockers.size - wallsSize;
};

const part2 = (data) => {
  const walls = helpers.splitByNewLine(data);
  const blockers = new Set();
  const lowestPoint = generateWalls(walls, blockers);
  const wallsSize = blockers.size;
  while (true) {
    const { x, y } = dropSand(blockers, lowestPoint, true);
    if (x === 500 && y === 0) {
      blockers.add(`${x},${y}`);
      break;
    }
    if (y === lowestPoint + 2) {
      blockers.add(`${x},${y - 1}`);
    } else {
      blockers.add(`${x},${y}`);
    }
  }

  return blockers.size - wallsSize;
};

module.exports = {
  part1,
  part2,
};
