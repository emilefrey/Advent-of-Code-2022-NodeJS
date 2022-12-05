var helpers = require("./helpers");

const part1 = (data) => {
  const [stackData, instructions] = helpers.splitByBlankLine(data);
  const finalStackArray = getArrayOfStackArrays(stackData);

  helpers.splitByNewLine(instructions).forEach((step) => {
    const [_, howMany, _2, from, _3, to] = step.split(" ").map(Number);
    for (let i = 0; i < howMany; i++) {
      const removed = finalStackArray[from - 1].pop();
      finalStackArray[to - 1].push(removed);
    }
  });
  const topOfStacks = finalStackArray.map((stack) => stack[stack.length - 1]);

  return topOfStacks;
};

const part2 = (data) => {
  const [stackData, instructions] = helpers.splitByBlankLine(data);
  const finalStackArray = getArrayOfStackArrays(stackData);

  helpers.splitByNewLine(instructions).forEach((step) => {
    const [_, howMany, _2, from, _3, to] = step.split(" ").map(Number);
    const removed = [];
    for (let i = 0; i < howMany; i++) {
      const popped = finalStackArray[from - 1].pop();
      removed.unshift(popped);
    }
    finalStackArray[to - 1] = [...finalStackArray[to - 1], ...removed];
  });

  const topOfStacks = finalStackArray.map((stack) => stack[stack.length - 1]);

  return topOfStacks;
};

// i hate this code, but just kept moving forward trying to process the stack data into array of stack arrays
const getArrayOfStackArrays = (stackData) => {
  const stackDataArray = helpers.splitByNewLine(stackData);
  let line = 0;
  const stacks = [];
  while (stackDataArray[line].includes("[")) {
    const stackLine = stackDataArray[line];
    const currentStack = [];
    for (
      let stackCharacterIndex = 1;
      stackCharacterIndex < stackLine.length;
      stackCharacterIndex += 4
    ) {
      const item = stackLine[stackCharacterIndex];
      currentStack.push(item);
    }
    stacks.push(currentStack);
    line += 1;
  }

  let finalStackArray = [];
  for (let arrays = 0; arrays < 9; arrays += 1) {
    let finalStack = [];
    for (let stackArrayIndex = 7; stackArrayIndex >= 0; stackArrayIndex--) {
      const toPush = stacks[stackArrayIndex].shift();
      if (toPush !== " ") finalStack.push(toPush);
    }
    finalStackArray.push(finalStack);
  }
  return finalStackArray;
};

module.exports = {
  part1,
  part2,
};
