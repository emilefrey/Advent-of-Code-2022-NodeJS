var helpers = require("./helpers");

const part1 = (data) => {
  const inputArray = helpers.splitByNewLine(data);
  var x = 0;
  var y = 0;
  inputArray.forEach((input) => {
    var [command, amount] = helpers.splitBySpace(input);
    amount = parseInt(amount);
    if (command === "forward") {
      x += amount;
    } else if (command === "down") {
      y += amount;
    } else {
      y -= amount;
    }
  });
  return x * y;
};

const part2 = (data) => {
  return "TODO ";
};

module.exports = {
  part1,
  part2,
};
