var helpers = require("./helpers");

const part1 = (data) => {
  const sides = new Set();
  const sideArray = [];
  const cubes = helpers.splitByNewLine(data).map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x: x, y: y, z: z };
  });
  let adjacent = 0;

  cubes.forEach((cube) => {
    const xPlus = cube.x + 1;
    const yPlus = cube.y + 1;
    const zPlus = cube.z + 1;
    // x sides
    const x1 = `${cube.x}${cube.y}${cube.z}${cube.x}${yPlus}${zPlus}`;
    const x2 = `${xPlus}${cube.y}${cube.z}${xPlus}${yPlus}${zPlus}`;
    // y sides
    const y1 = `${cube.x}${cube.y}${cube.z}${xPlus}${cube.y}${zPlus}`;
    const y2 = `${cube.x}${yPlus}${cube.z}${xPlus}${yPlus}${zPlus}`;
    // z sides
    const z1 = `${cube.x}${cube.y}${cube.z}${xPlus}${yPlus}${cube.z}`;
    const z2 = `${cube.x}${cube.y}${zPlus}${xPlus}${yPlus}${zPlus}`;
    const cubeSides = [x1, x2, y1, y2, z1, z2];
    cubeSides.forEach((cubeSideString) => {
      sideArray.push(cubeSideString);
      if (sides.has(cubeSideString)) {
        adjacent += 2;
        sides.delete(cubeSideString);
      } else {
        sides.add(cubeSideString);
      }
    });
  });
  return cubes.length * 6 - adjacent;
};

// 4755 too high
// 3484 too low
const part2 = (data) => {
  return 0;
};

module.exports = { part1, part2 };
