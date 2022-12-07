var helpers = require("./helpers");

const part1 = (data) => {
  const stuff = helpers.splitByNewLine(data);
  let directoryLinesLibrary = {};
  let lineDirectoryLibrary = {};
  // let directoryLines = stuff
  //   .map((command, index) => ({ command: command, index: index }))
  //   .filter((line) => line.command.includes("cd"));

  let directoryStack = [];
  stuff.forEach((line, index) => {
    let loopLine = index + 1;
    console.log(loopLine);
    if (line === "$ ls") {
      // next lines are dirs
      while (stuff[loopLine] && !stuff[loopLine].includes("$")) {
        if (stuff[loopLine].includes("dir ")) {
          const directory = stuff[loopLine].split(" ")[1];
          if (directory !== "..") {
            directoryStack.push(directory);
          } else {
            directoryStack.pop();
          }
          lineDirectoryLibrary[line.index] = directoryStack.join("/");
          directoryLinesLibrary[directoryStack.join("/")] = line.index;
        }
        loopLine++;
      }
    }
  });

  const getDirectoryInfo = (directoryOfInterestLine) => {
    let currentLine = directoryOfInterestLine;
    let directoryTotal = 0;
    let currentLineContent = stuff[currentLine + 2];

    while (currentLineContent && !currentLineContent?.includes("$")) {
      const currentDirectory =
        lineDirectoryLibrary[(currentLine + 2).toString()];
      if (currentLineContent.includes("dir ")) {
        directoryTotal += getDirectoryInfo(
          // refactor this $HIT
          directoryLinesLibrary[currentDirectory]
        );
      } else {
        directoryTotal += parseInt(currentLineContent.split(" ")[0]);
      }
      currentLine++;
      currentLineContent = stuff[currentLine + 2];
    }
    return directoryTotal;
  };

  let totalOfAll = 0;

  let directoriesTotal = {};
  Object.entries(directoryLinesLibrary).forEach(([directory, line]) => {
    const total = getDirectoryInfo(line);
    directoriesTotal[directory] = directoriesTotal[directory] ?? 0 + total;
    if (directoriesTotal[directory] <= 100000) {
      totalOfAll += total;
    }
  });

  const directoriesArray = Object.entries(directoriesTotal);
  Object.entries(directoriesArray).forEach(([directory, total]) => {});

  return directoriesTotal;
};

const part2 = (data) => {
  const stuff = helpers.splitByNewLine(data);
  stuff.forEach((item, index) => {});
  return 0;
};

module.exports = {
  part1,
  part2,
};
