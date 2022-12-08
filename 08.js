var helpers = require("./helpers");

const checkTree = (rowIndex, internalRowIndex, treeData, treeHeight) => {
  // check up
  let visibleUp = true;
  let visibleDown = true;
  let visibleRight = true;
  let visibleLeft = true;
  for (let verticalPos = rowIndex - 1; verticalPos >= 0; verticalPos--) {
    if (parseInt(treeData[verticalPos][internalRowIndex]) >= treeHeight) {
      visibleUp = false;
      break;
    }
  }
  if (visibleUp) return visibleUp;
  // check down
  for (
    let verticalPos = rowIndex + 1;
    verticalPos < treeData.length;
    verticalPos++
  ) {
    if (parseInt(treeData[verticalPos][internalRowIndex]) >= treeHeight) {
      visibleDown = false;
      break;
    }
  }
  if (visibleDown) return visibleDown;

  // check right
  for (
    let horizPos = internalRowIndex + 1;
    horizPos < treeData[rowIndex].length;
    horizPos++
  ) {
    if (parseInt(treeData[rowIndex][horizPos]) >= treeHeight) {
      visibleRight = false;
      break;
    }
  }
  if (visibleRight) return visibleRight;
  // check left
  for (let horizPos = internalRowIndex - 1; horizPos >= 0; horizPos--) {
    if (parseInt(treeData[rowIndex][horizPos]) >= treeHeight) {
      visibleLeft = false;
      break;
    }
  }
  if (visibleLeft) return visibleLeft;
};

const getScenicScore = (rowIndex, internalRowIndex, treeData, treeHeight) => {
  // check up
  let visibleUp = 0;
  let visibleDown = 0;
  let visibleRight = 0;
  let visibleLeft = 0;
  for (let verticalPos = rowIndex - 1; verticalPos >= 0; verticalPos--) {
    if (parseInt(treeData[verticalPos][internalRowIndex]) < treeHeight) {
      visibleUp++;
      continue;
    }
    visibleUp++;
    break;
  }
  // check down
  for (
    let verticalPos = rowIndex + 1;
    verticalPos < treeData.length;
    verticalPos++
  ) {
    if (parseInt(treeData[verticalPos][internalRowIndex]) < treeHeight) {
      visibleDown++;
      continue;
    }
    visibleDown++;
    break;
  }

  // check right
  for (
    let horizPos = internalRowIndex + 1;
    horizPos < treeData[rowIndex].length;
    horizPos++
  ) {
    if (parseInt(treeData[rowIndex][horizPos]) < treeHeight) {
      visibleRight++;
      continue;
    }
    visibleRight++;
    break;
  }
  // check left
  for (let horizPos = internalRowIndex - 1; horizPos >= 0; horizPos--) {
    if (parseInt(treeData[rowIndex][horizPos]) < treeHeight) {
      visibleLeft++;
      continue;
    }
    visibleLeft++;
    break;
  }

  return visibleUp * visibleDown * visibleRight * visibleLeft;
};

const part1 = (data) => {
  const treeData = helpers.splitByNewLine(data);
  let visibleTrees = 0;
  treeData.forEach((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === treeData.length - 1) {
      visibleTrees += row.length;
    } else {
      const rowArray = row.split("");
      rowArray.forEach((tree, internalRowIndex) => {
        if (
          internalRowIndex === 0 ||
          internalRowIndex === rowArray.length - 1
        ) {
          visibleTrees++;
        } else {
          if (checkTree(rowIndex, internalRowIndex, treeData, parseInt(tree))) {
            visibleTrees++;
          }
        }
      });
    }
  });

  return visibleTrees;
};

const part2 = (data) => {
  const treeData = helpers.splitByNewLine(data);
  let max = 0;
  treeData.forEach((row, rowIndex) => {
    const rowArray = row.split("");
    rowArray.forEach((tree, internalRowIndex) => {
      const value = getScenicScore(
        rowIndex,
        internalRowIndex,
        treeData,
        parseInt(tree)
      );
      if (value > max) max = value;
    });
  });
  return max;
};

module.exports = {
  part1,
  part2,
};
