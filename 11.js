var helpers = require("./helpers");

const part1 = (data) => {
  const monkeys = helpers.splitByBlankLine(data);
  const monkeyDict = {};
  monkeys.forEach((monkey, index) => {
    let [_, items, operation, divisibleBy, ifTrueToMonkey, ifFalseToMonkey] =
      helpers.splitByNewLine(monkey);

    items = items.split(": ")[1].split(", ").map(Number);
    operation = operation.split("= ")[1];
    const throwToMonkey = (testValue) =>
      testValue % parseInt(divisibleBy.split("by ")[1]) === 0
        ? parseInt(ifTrueToMonkey.split("monkey ")[1])
        : parseInt(ifFalseToMonkey.split("monkey ")[1]);

    monkeyDict[index] = {
      items: items,
      operation: operation,
      throwToMonkey: throwToMonkey,
      inspections: 0,
    };
  });

  for (let i = 0; i < 20; i++) {
    Object.values(monkeyDict).forEach((monkey, monkeyDictIndex) => {
      monkey.items.forEach((old, itemIndex) => {
        monkey.items[itemIndex] = Math.floor(eval(monkey.operation) / 3);
        const value = monkey.items[itemIndex];
        monkeyDict[monkey.throwToMonkey(value)].items.push(value);
        monkey.inspections++;
      });
      // monkey always throws everything, clear him/her out
      monkey.items = [];
    });
  }

  const top2 = Object.values(monkeyDict)
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2);
  return top2[0] * top2[1];
};

const part2 = (data) => {
  const monkeys = helpers.splitByBlankLine(data);
  const monkeyDict = {};
  const leastCommonMultDivisor = monkeys
    .map((monkey) => {
      let [_, __, ___, divisibleBy] = helpers
        .splitByNewLine(monkey)
        .map((divis) => parseInt(divis.split("by ")[1]));
      return divisibleBy;
    })
    .reduce((curr, number) => curr * number, 1);

  monkeys.forEach((monkey, index) => {
    let [_, items, operation, divisibleBy, ifTrueToMonkey, ifFalseToMonkey] =
      helpers.splitByNewLine(monkey);

    items = items.split(": ")[1].split(", ").map(Number);
    operation = operation.split("= ")[1];

    const throwToMonkey = (testValue) =>
      testValue % parseInt(divisibleBy.split("by ")[1]) === 0
        ? parseInt(ifTrueToMonkey.split("monkey ")[1])
        : parseInt(ifFalseToMonkey.split("monkey ")[1]);

    monkeyDict[index] = {
      items: items,
      operation: operation,
      throwToMonkey: throwToMonkey,
      inspections: 0,
    };
  });

  for (let i = 0; i < 10000; i++) {
    Object.values(monkeyDict).forEach((monkey, monkeyDictIndex) => {
      monkey.items.forEach((old, itemIndex) => {
        monkey.items[itemIndex] = Math.floor(eval(monkey.operation));
        const value = monkey.items[itemIndex] % leastCommonMultDivisor;
        monkeyDict[monkey.throwToMonkey(value)].items.push(value);
        monkey.inspections++;
      });
      // monkey always throws everything, clear em out
      monkey.items = [];
    });
  }

  const top2 = Object.values(monkeyDict)
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a);
  return top2[0] * top2[1];
};

module.exports = {
  part1,
  part2,
};
