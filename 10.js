var helpers = require("./helpers");

const part1 = (data) => {
  const stuff = helpers.splitByNewLine(data);

  let cycle = 1;
  const cyclesToCheck = [20, 60, 100, 140, 180, 220];
  let total = 1;
  let signal = 0;

  stuff.forEach((command) => {
    let [directive, amount] = command.split(" ");
    amount = parseInt(amount);
    if (directive === "noop") {
      cycle++;
      if (cyclesToCheck.includes(cycle)) {
        signal += total * cycle;
      }
    } else {
      for (let addXCycle = 1; addXCycle <= 2; addXCycle++) {
        cycle += 1;
        if (addXCycle === 2) {
          total += amount;
        }
        if (cyclesToCheck.includes(cycle)) {
          signal += total * cycle;
        }
      }
    }
  });

  return signal;
};

const generatePixel = (spritePosition, cycle) => {
  const spriteLocations = [
    spritePosition - 1,
    spritePosition,
    spritePosition + 1,
  ];

  if (spriteLocations.includes(cycle - 1)) {
    return "#";
  } else {
    return " ";
  }
};

const part2 = (data) => {
  const stuff = helpers.splitByNewLine(data);

  let cycle = 1;
  const cyclesToCheck = { 0: [], 40: [], 80: [], 120: [], 160: [], 200: [] };
  let total = 1;

  stuff.forEach((command) => {
    let [directive, amount] = command.split(" ");
    amount = parseInt(amount);
    let currentRowKey = Math.max(
      ...Object.keys(cyclesToCheck).filter((toCheck) => cycle > toCheck)
    );
    if (directive === "noop") {
      currentRowKey = Math.max(
        ...Object.keys(cyclesToCheck).filter((toCheck) => cycle > toCheck)
      );
      cyclesToCheck[currentRowKey].push(
        generatePixel(total + currentRowKey, cycle)
      );
      cycle++;
    } else {
      for (let addXCycle = 1; addXCycle <= 2; addXCycle++) {
        currentRowKey = Math.max(
          ...Object.keys(cyclesToCheck).filter((toCheck) => cycle > toCheck)
        );
        cyclesToCheck[currentRowKey].push(
          generatePixel(total + currentRowKey, cycle)
        );
        cycle += 1;
        if (addXCycle === 2) {
          total += amount;
        }
      }
    }
  });

  Object.values(cyclesToCheck).forEach((cycle) => {
    console.log(cycle.join(""));
  });
  return "SEE CRT ABOVE!";
};

module.exports = {
  part1,
  part2,
};
