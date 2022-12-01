var helpers = require("./helpers");

const processElfSnackData = (data) => {
  // split by blank line to separate out the elves
  const elfSnackCalories = helpers.splitByBlankLine(data);
  // convert the array of strings to array of int arrays
  const arrayOfCalorieArrays = elfSnackCalories.map((elfSnacks) =>
    elfSnacks.split("\n").map((elfSnack) => parseInt(elfSnack))
  );
  return arrayOfCalorieArrays;
};

const getElfSnackTotal = (calorieArray) => {
  return calorieArray.reduce(
    (partialSum, currentCalorieCount) => partialSum + currentCalorieCount,
    0
  );
};

const part1 = (data) => {
  const elfCalorieData = processElfSnackData(data);
  let maxCalorieCount = 0;
  elfCalorieData.forEach((calorieArray) => {
    const elfSnackTotalCalorieCount = getElfSnackTotal(calorieArray);
    if (elfSnackTotalCalorieCount > maxCalorieCount) {
      maxCalorieCount = elfSnackTotalCalorieCount;
    }
  });
  return maxCalorieCount;
};

const part2 = (data) => {
  const elfCalorieData = processElfSnackData(data);
  let calorieCountArray = [];
  elfCalorieData.forEach((calorieArray) => {
    const elfSnackTotalCalorieCount = getElfSnackTotal(calorieArray);
    calorieCountArray.push(elfSnackTotalCalorieCount);
  });
  calorieCountArray.sort((a, b) => b - a);
  return calorieCountArray[0] + calorieCountArray[1] + calorieCountArray[2];
};

module.exports = {
  part1,
  part2,
};
