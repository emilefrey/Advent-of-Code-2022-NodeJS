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
    console.log(index);
    const [sensorX, sensorY] = pair[0].split(",").map(Number);
    const [beaconX, beaconY] = pair[1].split(",").map(Number);
    beaconSensorSet.add(`${sensorX},${sensorY}`);
    beaconSensorSet.add(`${beaconX},${beaconY}`);

    const manhattanDistance =
      Math.abs(beaconY - sensorY) + Math.abs(beaconX - sensorX);
    for (let i = 0; i <= manhattanDistance; i++) {
      for (let j = 0; j <= manhattanDistance - i; j++) {
        const q1x = sensorX + j;
        const q1y = sensorY + i;
        const q2x = sensorX - j;
        const q2y = sensorY + i;
        const q3x = sensorX - j;
        const q3y = sensorY - i;
        const q4x = sensorX + j;
        const q4y = sensorY - i;
        if (q1y === rowOfInterest) {
          pointsCovered.add(`${q1x},${q1y}`);
        }
        if (q2y === rowOfInterest) {
          pointsCovered.add(`${q2x},${q2y}`);
        }
        if (q3y === rowOfInterest) {
          pointsCovered.add(`${q3x},${q3y}`);
        }
        if (q4y === rowOfInterest) {
          pointsCovered.add(`${q4x},${q4y}`);
        }
      }
    }
  });
  removeAll(pointsCovered, beaconSensorSet);
  const row10 = Array.from(pointsCovered).filter((point) =>
    point.endsWith(",2000000")
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
