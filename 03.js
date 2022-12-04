var helpers = require("./helpers");
const isUpperCase = (string) => /^[A-Z]*$/.test(string);

const part1 = (data) => {
  const sacks = helpers.splitByNewLine(data);
  let total = 0;
  sacks.forEach((sack) => {
    const sackCompartLength = sack.length / 2;
    const comp1 = [...sack.slice(0, sackCompartLength)];
    const comp2 = [...sack.slice(sackCompartLength * -1)];
    matching = comp1.filter((comp1item) => comp2.includes(comp1item))[0];
    total += isUpperCase(matching)
      ? matching.charCodeAt(0) - 38
      : matching.charCodeAt(0) - 96;
  });
  return total;
};

const part2 = (data) => {
  const sacks = helpers.splitByNewLine(data);
  let total = 0;
  for (let i = 0; i < sacks.length; i += 3) {
    const matching = [...sacks[i]].filter(
      (item) =>
        [...sacks[i + 1]].includes(item) && [...sacks[i + 2]].includes(item)
    )[0];
    total += isUpperCase(matching)
      ? matching.charCodeAt(0) - 38
      : matching.charCodeAt(0) - 96;
  }
  return total;
};

module.exports = {
  part1,
  part2,
};
