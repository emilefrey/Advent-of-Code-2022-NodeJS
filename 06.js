const getMarker = (input, count) => {
  for (let i = 0; i < input.length; i++) {
    const set = new Set(input.substr(i, count));
    if (set.size === count) {
      return i + count;
    }
  }
};

const part1 = (data) => {
  return getMarker(data, 4);
};

const part2 = (data) => {
  return getMarker(data, 14);
};

module.exports = {
  part1,
  part2,
};
