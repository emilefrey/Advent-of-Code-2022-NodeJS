var helpers = require("./helpers");
const shapeScores = { X: 1, Y: 2, Z: 3 };
const part1 = (data) => {
  const rounds = helpers.splitByNewLine(data);
  const determineIfWon = (shapeOfOpponent, shapeOfPersonInQuestion) => {
    switch (shapeOfPersonInQuestion) {
      // if rock
      case "X":
        // can only win if opponent threw scissors
        return shapeOfOpponent === "C";
      // if paper
      case "Y":
        return shapeOfOpponent === "A";
      // if scissors
      case "Z":
        return shapeOfOpponent === "B";
    }
  };

  const determineRoundScore = (opponent, me) => {
    let myScore = 0;
    // if tie
    if (
      (opponent === "A" && me === "X") ||
      (opponent === "B" && me === "Y") ||
      (opponent === "C" && me === "Z")
    ) {
      myScore += 3;
      // add 6 points if winner
    } else {
      myScore += determineIfWon(opponent, me) ? 6 : 0;
    }
    // add shape score
    myScore += shapeScores[me];
    return myScore;
  };

  let finalScore = 0;
  rounds.forEach((round) => {
    const [opponent, me] = round.split(" ");
    finalScore += determineRoundScore(opponent, me);
  });

  return finalScore;
};

const part2 = (data) => {
  const rounds = helpers.splitByNewLine(data);

  const determineIfWon = (shapeOfOpponent, moveToMake) => {
    let shapeToPick = "";
    let winStatus = false;
    switch (moveToMake) {
      // lose
      case "X":
        if (shapeOfOpponent === "A") {
          shapeToPick = "Z";
        } else if (shapeOfOpponent === "B") {
          shapeToPick = "X";
        } else if (shapeOfOpponent === "C") {
          shapeToPick = "Y";
        }
        break;
      case "Y":
        if (shapeOfOpponent === "A") {
          shapeToPick = "X";
        } else if (shapeOfOpponent === "B") {
          shapeToPick = "Y";
        } else if (shapeOfOpponent === "C") {
          shapeToPick = "Z";
        }
        break;
      case "Z":
        if (shapeOfOpponent === "A") {
          shapeToPick = "Y";
        } else if (shapeOfOpponent === "B") {
          shapeToPick = "Z";
        } else if (shapeOfOpponent === "C") {
          shapeToPick = "X";
        }
        winStatus = true;
        break;
    }
    return { didIWin: winStatus, shapeToPick: shapeToPick };
  };

  const determineScore = (opponent, me) => {
    let myScore = 0;
    // if tie
    const { didIWin, shapeToPick } = determineIfWon(opponent, me);
    if (me === "Y") {
      myScore += 3;
    } else {
      myScore += didIWin ? 6 : 0;
    }
    myScore += shapeScores[shapeToPick];
    return myScore;
  };

  let finalScore = 0;
  rounds.forEach((round) => {
    const [opponent, me] = round.split(" ");
    finalScore += determineScore(opponent, me);
  });

  return finalScore;
};

module.exports = {
  part1,
  part2,
};
