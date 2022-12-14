var helpers = require("./helpers");

const compareItems = (one, two) => {
  for (let i = 0; i < one.length; i++) {
    // took me too long to think I needed this, but yeah...if the second list
    // is shorter than the first, return false
    if (two[i] === undefined) return false;
    // if they are both numbers, can compare
    if (typeof one[i] === "number" && typeof two[i] === "number") {
      if (one[i] > two[i]) return false;
      if (one[i] < two[i]) return true;
    }
    let result = null;
    // 3 conditions. both arrays. array/number. number/array.
    if (Array.isArray(one[i]) && Array.isArray(two[i])) {
      result = compareItems(one[i], two[i]);
    } else if (Array.isArray(one[i])) {
      result = compareItems(one[i], [two[i]]);
    } else if (Array.isArray(two[i])) {
      result = compareItems([one[i]], two[i]);
    }
    // if the above got a result, return it, otherwise keep going
    if (result !== null) return result;
  }
  // if you got thru everything and one list is shorter than other, then return true
  return one.length < two.length ? true : null;
};

const part1 = (data) => {
  const pairs = helpers.splitByBlankLine(data);
  let total = 0;
  pairs.forEach((pair, indexToAdd) => {
    let stuff = helpers.splitByNewLine(pair).map(eval);
    total += compareItems(stuff[0], stuff[1]) ? indexToAdd + 1 : 0;
  });
  return total;
};

const part2 = (data) => {
  const lines = helpers
    .splitByNewLine(data)
    .filter((line) => line !== "")
    .map(eval);
  const marker1 = [[2]];
  const marker2 = [[6]];
  let all = [marker1, marker2, ...lines];
  // I was gonna try to do this manually. Sort is pretty amazing.
  all.sort((a, b) => (compareItems(a, b) ? -1 : 1));
  const marker1Index = all.findIndex((item) => item === marker1) + 1;
  const marker2Index = all.findIndex((item) => item === marker2) + 1;
  return marker1Index * marker2Index;
};

module.exports = {
  part1,
  part2,
};
