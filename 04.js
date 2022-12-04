var helpers = require("./helpers");

const part1 = (data) => {
  const assignment = helpers.splitByNewLine(data);
  let total = 0;

  assignment.forEach((assign) => {
    const [range1, range2] = assign.split(",");
    const [range1start, range1end] = range1.split("-");
    const [range2start, range2end] = range2.split("-");
    const range1range = parseInt(range1end) - parseInt(range1start);
    const range2range = parseInt(range2end) - parseInt(range2start);
    const range1array = Array.from(
      { length: range1range + 1 },
      (_, i) => i + parseInt(range1start)
    );
    const range2array = Array.from(
      { length: range2range + 1 },
      (_, i) => i + parseInt(range2start)
    );
    // if the set is the same length as the smaller set, then we know we have a complete overlap
    const smallestRangeLength =
      range1range <= range2range ? range1range : range2range;
    const set = range1array.filter((range1item) =>
      range2array.includes(range1item)
    );
    if (set.length === smallestRangeLength + 1) {
      total += 1;
    }
  });
  return total;
};

const part2 = (data) => {
  const assignment = helpers.splitByNewLine(data);
  let total = 0;

  assignment.forEach((assign) => {
    const [range1, range2] = assign.split(",");
    const [range1start, range1end] = range1.split("-");
    const [range2start, range2end] = range2.split("-");
    const range1range = parseInt(range1end) - parseInt(range1start);
    const range2range = parseInt(range2end) - parseInt(range2start);
    const range1array = Array.from(
      { length: range1range + 1 },
      (_, i) => i + parseInt(range1start)
    );
    const range2array = Array.from(
      { length: range2range + 1 },
      (_, i) => i + parseInt(range2start)
    );
    // really the only change for part 2 was to findIndex vs filter/includes
    const overlap = range1array.findIndex((range1item) =>
      range2array.includes(range1item)
    );
    if (overlap !== -1) {
      total += 1;
    }
  });
  return total;
};

module.exports = {
  part1,
  part2,
};
