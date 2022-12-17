var helpers = require("./helpers");

function removeAll(originalSet, toBeRemovedSet) {
  [...toBeRemovedSet].forEach(function (v) {
    originalSet.delete(v);
  });
}

const part1 = (data) => {
  const sensorBeaconData = helpers
    .splitByNewLine(data)
    .map((line) =>
      line
        .replace("Sensor at ", "")
        .replace("closest beacon is at ", "")
        .replaceAll("x=", "")
        .replaceAll("y=", "")
    )
    .map((item) => item.split(": "));
  const rowOfInterest = 2000000;
  const beaconSensorSet = new Set();
  const pointsCovered = new Set();
  sensorBeaconData.forEach((pair, index) => {
    const [sensorX, sensorY] = pair[0].split(",").map(Number);
    const [beaconX, beaconY] = pair[1].split(",").map(Number);
    beaconSensorSet.add(`${sensorX},${sensorY}`);
    beaconSensorSet.add(`${beaconX},${beaconY}`);

    const manhattanDistance =
      Math.abs(beaconY - sensorY) + Math.abs(beaconX - sensorX);
    for (let i = 0; i <= manhattanDistance; i++) {
      const yPlus = sensorY + i;
      const yMinus = sensorY - i;
      if (yPlus !== rowOfInterest && yMinus !== rowOfInterest) {
        continue;
      }
      for (let j = 0; j <= manhattanDistance - i; j++) {
        const xPlus = sensorX + j;
        const xMinus = sensorX - j;
        if (yPlus === rowOfInterest) {
          pointsCovered.add(`${xPlus},${yPlus}`);
          pointsCovered.add(`${xMinus},${yPlus}`);
        } else if (yMinus === rowOfInterest) {
          pointsCovered.add(`${xPlus},${yMinus}`);
          pointsCovered.add(`${xMinus},${yMinus}`);
        }
      }
    }
  });
  removeAll(pointsCovered, beaconSensorSet);
  const row = Array.from(pointsCovered).filter((point) =>
    point.endsWith(",2000000")
  );
  return row.length;
};

const inRange = (value, max) => {
  return value >= 0 && value <= max;
};

const coordinatesInRange = (xValue, yValue, max) => {
  return inRange(xValue, max) && inRange(yValue, max);
};

const storeIfInRange = (xValue, yValue, array, max) => {
  if (coordinatesInRange(xValue, yValue, max)) {
    array.push({ x: xValue, y: yValue });
  }
};

const determineIfPointIsWithinOtherSensorsRange = (point, sensorArray) => {
  let inRange = false;

  // check to see if at least one sensor can "see" point
  // if not, we know we have the point we're interested in and should return it
  // otherwise, return true

  for (let i = 0; i < sensorArray.length; i++) {
    if (
      Math.abs(point.x - sensorArray[i].sensorX) +
        Math.abs(point.y - sensorArray[i].sensorY) <=
      sensorArray[i].manhattanDistance
    ) {
      inRange = true;
      break;
    }
  }
  return { inRange: inRange, x: point.x, y: point.y };
};

const part2 = (data) => {
  const sensorBeaconData = helpers
    .splitByNewLine(data)
    .map((line) =>
      line
        .replace("Sensor at ", "")
        .replace("closest beacon is at ", "")
        .replaceAll("x=", "")
        .replaceAll("y=", "")
    )
    .map((item) => item.split(": "));
  const max = 4000000;
  const sensors = {};
  sensorBeaconData.forEach((pair, index) => {
    const [sensorX, sensorY] = pair[0].split(",").map(Number);
    const [beaconX, beaconY] = pair[1].split(",").map(Number);
    const manhattanDistance =
      Math.abs(beaconY - sensorY) + Math.abs(beaconX - sensorX);
    const pointsOutside = [];
    for (let i = 0; i <= manhattanDistance + 1; i++) {
      const yPlus = sensorY + i;
      const yMinus = sensorY - i;
      const xPlus = sensorX + (manhattanDistance + 1 - i);
      const xMinus = sensorX - (manhattanDistance + 1 - i);
      storeIfInRange(xPlus, yPlus, pointsOutside, max);
      storeIfInRange(xPlus, yMinus, pointsOutside, max);
      storeIfInRange(xMinus, yPlus, pointsOutside, max);
      storeIfInRange(xMinus, yMinus, pointsOutside, max);
    }
    sensors[index] = {
      sensorX: sensorX,
      sensorY: sensorY,
      manhattanDistance: manhattanDistance,
      pointsOutside: pointsOutside,
    };
  });

  const sensorArray = Object.values(sensors);
  let uncoveredX;
  let uncoveredY;
  let pointFound = false;
  for (let sensorIndex = 0; sensorIndex < sensorArray.length; sensorIndex++) {
    for (
      let pointIndex = 0;
      pointIndex < sensorArray[sensorIndex].pointsOutside.length;
      pointIndex++
    ) {
      const { inRange, x, y } = determineIfPointIsWithinOtherSensorsRange(
        sensorArray[sensorIndex].pointsOutside[pointIndex],
        sensorArray
      );
      if (inRange) {
        continue;
      } else {
        pointFound = true;
        uncoveredX = x;
        uncoveredY = y;
        break;
      }
    }
    if (!pointFound) {
      continue;
    } else {
      break;
    }
  }
  return uncoveredX * 4000000 + uncoveredY;
};

module.exports = {
  part1,
  part2,
};
