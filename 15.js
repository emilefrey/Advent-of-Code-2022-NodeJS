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
  const rowOfInterest = 10;
  const beaconSensorSet = new Set();
  const pointsCovered = new Set();
  sensorBeaconData.forEach((pair, index) => {
    console.log(index);
    const [sensorX, sensorY] = pair[0].split(",").map(Number);
    const [beaconX, beaconY] = pair[1].split(",").map(Number);
    beaconSensorSet.add(`${sensorX},${sensorY}`);
    beaconSensorSet.add(`${beaconX},${beaconY}`);

    const manhattanDistance =
      Math.abs(beaconY - sensorY) + Math.abs(beaconX - sensorX);
    for (let i = 0; i <= manhattanDistance; i++) {
      for (let j = 0; j <= manhattanDistance - i; j++) {
        const yPlus = sensorY + i;
        const yMinus = sensorY - i;
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
  const row10 = Array.from(pointsCovered).filter((point) =>
    point.endsWith(",10")
  );
  return row10.length;
};

const part2 = (data) => {
  return 0;
};

module.exports = {
  part1,
  part2,
};
