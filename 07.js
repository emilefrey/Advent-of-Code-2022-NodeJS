var helpers = require("./helpers");
//WARNING THIS IS TERRIBLE AND I'LL NEVER UNDERSTAND IT AGAIN
const getDirectorySizes = (data) => {
  const stuff = helpers.splitByNewLine(data);

  const directoryStack = ["/"];
  const directorySizes = {};

  for (let i = 1; i < stuff.length; i++) {
    let line = stuff[i];
    if (line.includes(" ls")) {
      // next lines must include info about directory
      i++;
      while (stuff[i] && !stuff[i].includes("$")) {
        line = stuff[i];
        if (!line.includes("dir ")) {
          directoryStack.forEach((directory) => {
            directorySizes[directory] =
              (directorySizes[directory] ?? 0) + parseInt(line.split(" ")[0]);
          });
        }
        i++;
      }
      // go back one line, hacky stuff!
      i--;
      line = stuff[i];
    } else if (line.includes("cd ")) {
      if (line.includes("..")) {
        directoryStack.pop();
      } else {
        directoryStack.push(
          `${directoryStack[directoryStack.length - 1]}${line.split(" ")[2]}/`
        );
      }
    }
  }
  return directorySizes;
};

const part1 = (data) => {
  const directorySizes = getDirectorySizes(data);

  return Object.values(directorySizes)
    .filter((size) => size <= 100000)
    .reduce((runningTotal, currentValue) => runningTotal + currentValue);
};

const part2 = (data) => {
  const directorySizes = getDirectorySizes(data);
  const usedSpace = directorySizes["/"];
  const unusedSpace = 70000000 - usedSpace;

  return Object.values(directorySizes)
    .sort((a, b) => a - b)
    .find((value) => unusedSpace + value >= 30000000);
};

module.exports = {
  part1,
  part2,
};
