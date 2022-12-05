var helpers = require("./helpers");

const part1 = (data) => {
  const [_, instructions] = helpers.splitByBlankLine(data);
  const stack1 = ["B", "P", "N", "Q", "H", "D", "R", "T"];
  const stack2 = ["W", "G", "B", "J", "T", "V"];
  const stack3 = ["N", "R", "H", "D", "S", "V", "M", "Q"];
  const stack4 = ["P", "Z", "N", "M", "C"];
  const stack5 = ["D", "Z", "B"];
  const stack6 = ["V", "C", "W", "Z"];
  const stack7 = ["G", "Z", "N", "C", "V", "Q", "L", "S"];
  const stack8 = ["L", "G", "J", "M", "D", "N", "V"];
  const stack9 = ["T", "P", "M", "F", "Z", "C", "G"];

  const arrayOfStacks = [
    stack1,
    stack2,
    stack3,
    stack4,
    stack5,
    stack6,
    stack7,
    stack8,
    stack9,
  ];
  helpers.splitByNewLine(instructions).forEach((step) => {
    const [_, howMany, _2, from, _3, to] = step.split(" ").map(Number);
    for (let i = 0; i < howMany; i++) {
      const removed = arrayOfStacks[from - 1].pop();
      arrayOfStacks[to - 1].push(removed);
    }
  });
  const topOfStacks = arrayOfStacks.map((stack) => stack[stack.length - 1]);

  return topOfStacks;
};

const part2 = (data) => {
  const [_, instructions] = helpers.splitByBlankLine(data);
  const stack1 = ["B", "P", "N", "Q", "H", "D", "R", "T"];
  const stack2 = ["W", "G", "B", "J", "T", "V"];
  const stack3 = ["N", "R", "H", "D", "S", "V", "M", "Q"];
  const stack4 = ["P", "Z", "N", "M", "C"];
  const stack5 = ["D", "Z", "B"];
  const stack6 = ["V", "C", "W", "Z"];
  const stack7 = ["G", "Z", "N", "C", "V", "Q", "L", "S"];
  const stack8 = ["L", "G", "J", "M", "D", "N", "V"];
  const stack9 = ["T", "P", "M", "F", "Z", "C", "G"];

  const arrayOfStacks = [
    stack1,
    stack2,
    stack3,
    stack4,
    stack5,
    stack6,
    stack7,
    stack8,
    stack9,
  ];
  helpers.splitByNewLine(instructions).forEach((step) => {
    const [_, howMany, _2, from, _3, to] = step.split(" ").map(Number);
    const removed = [];
    for (let i = 0; i < howMany; i++) {
      const popped = arrayOfStacks[from - 1].pop();
      removed.unshift(popped);
    }
    arrayOfStacks[to - 1] = [...arrayOfStacks[to - 1], ...removed];
  });

  const topOfStacks = arrayOfStacks.map((stack) => stack[stack.length - 1]);

  return topOfStacks;
};

module.exports = {
  part1,
  part2,
};
