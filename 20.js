var helpers = require("./helpers");

const part1 = (data) => {
  const input = helpers
    .splitByNewLine(data)
    .map((value, index) => ({ value: parseInt(value), originalIndex: index }));

  for (let i = 0; i < input.length; i++) {
    const fromIndex = input.findIndex(
      (inputItem) => inputItem.originalIndex === i
    );
    let toIndex = fromIndex + input[fromIndex].value;
    if (toIndex >= input.length) {
      toIndex = toIndex % (input.length - 1);
    } else if (toIndex <= 0) {
      toIndex = input.length + (toIndex % (input.length - 1)) - 1;
    }

    const elementToMove = input.splice(fromIndex, 1)[0];

    input.splice(toIndex, 0, elementToMove);
  }
  const zeroIndex = input.findIndex((item) => item.value === 0);
  const one = input[(zeroIndex + 1000) % input.length];
  const two = input[(zeroIndex + 2000) % input.length];
  const three = input[(zeroIndex + 3000) % input.length];

  return one.value + two.value + three.value;
};

const part2 = (data) => {
  const input = helpers.splitByNewLine(data).map((value, index) => ({
    value: parseInt(value) * 811589153,
    originalIndex: index,
  }));
  for (let loops = 0; loops < 10; loops++) {
    for (let i = 0; i < input.length; i++) {
      const fromIndex = input.findIndex(
        (inputItem) => inputItem.originalIndex === i
      );
      let toIndex = fromIndex + input[fromIndex].value;
      if (toIndex >= input.length) {
        toIndex = toIndex % (input.length - 1);
      } else if (toIndex <= 0) {
        toIndex = input.length + (toIndex % (input.length - 1)) - 1;
      }

      const elementToMove = input.splice(fromIndex, 1)[0];

      input.splice(toIndex, 0, elementToMove);
    }
  }
  const zeroIndex = input.findIndex((item) => item.value === 0);
  const one = input[(zeroIndex + 1000) % input.length];
  const two = input[(zeroIndex + 2000) % input.length];
  const three = input[(zeroIndex + 3000) % input.length];
  return one.value + two.value + three.value;
};

module.exports = { part1, part2 };
