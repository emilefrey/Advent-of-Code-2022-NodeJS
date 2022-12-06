var helpers = require("./helpers");

const getSubstringWithUniqueCharactersPosition = (input, count) => {
  for (let i = 0; i < input.length; i++) {
    const set = new Set(input.substr(i, count));
    if (set.size === count) {
      return i + count;
    }
  }
  return `No substring with unique characters of length ${count}!`;
};

const part1 = (data) => {
  return getSubstringWithUniqueCharactersPosition(data, 4);
};

const part2 = (data) => {
  return getSubstringWithUniqueCharactersPosition(data, 14);
};

module.exports = {
  part1,
  part2,
};
