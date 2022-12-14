var helpers = require("./helpers");

const part1 = (data) => {
  const walls = helpers.splitByNewLine(data);
  const arrayOfWalls = [];
  walls.forEach((wall) => {
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
            arrayOfWalls.push(`${x1},${i}`);
          }
        } else {
          for (let i = y2; i <= y1; i++) {
            arrayOfWalls.push(`${x1},${i}`);
          }
        }
      } else if (y1 === y2) {
        if (x2 - x1 > 0) {
          for (let i = x1; i <= x2; i++) {
            arrayOfWalls.push(`${i},${y1}`);
          }
        } else {
          for (let i = x2; i <= x1; i++) {
            arrayOfWalls.push(`${i},${y1}`);
          }
        }
      }
    }
  });
  return arrayOfWalls;
};

const part2 = (data) => {
  return 0;
};

module.exports = {
  part1,
  part2,
};
