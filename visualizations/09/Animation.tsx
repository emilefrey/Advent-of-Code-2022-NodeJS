import React, { useEffect, useState } from "react";
import { Set } from "typescript";
import { part2 } from "./day9";
const day9 = require("./day9.txt");

export const Animation = () => {
  const [movements, setMovements] = useState<string[]>([]);
  const [all, setAll] = useState<any[]>([]);
  const [visited, setVisited] = useState<any[]>([]);

  const [current, setCurrent] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  // const knots: any = [];

  // //create the knots
  // for (let i = 0; i < 10; i++) {
  //   knots.push({ xPos: 0, yPos: 0 });
  // }

  useEffect(() => {
    fetch(day9)
      .then((r) => r.text())
      .then((text) => {
        setMovements(text.split("\n"));
      });
  }, []);

  useEffect(() => {
    const knots: any = [];
    for (let i = 0; i < 10; i++) {
      knots.push({ xPos: 0, yPos: 0 });
    }
    const tailPositionsVisited = new Set([`${knots[9].xPos}/${knots[9].yPos}`]);

    if (movements.length > 0) {
      const allMovements: any = [];
      movements.forEach((command) => {
        let [direction, amount]: any = command.split(" ");
        amount = parseInt(amount);
        for (let i = 0; i < amount; i++) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          part2(direction, knots, tailPositionsVisited);
          allMovements.push([...knots]);
        }
      });
      setAll(allMovements);
    }
  }, [movements]);

  useEffect(() => {
    if (all.length > 0) {
      const tailMoves = new Set([`0/0`]);
      all.forEach((move, index) => {
        setTimeout(() => {
          setCurrent(move);
          if (
            move[9].xPos !== all.at(index - 1)[9].xPos ||
            move[9].yPos !== all.at(index - 1)[9].yPos
          ) {
            tailMoves.add(`${move[9].xPos}/${move[9].yPos}`);
            setCount(tailMoves.size);
          }
          setVisited(
            Array.from(tailMoves).map((move) => {
              const [xPos, yPos] = move.split("/").map(Number);
              return { xPos: xPos, yPos: yPos };
            })
          );
        }, 20 * index);
      });
    }
  }, [all]);

  if (current.length > 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Unique Tail Visits: {count}</h3>
        {visited.map((visitedSpot, index) => (
          <div
            style={{
              position: "absolute",
              top: visitedSpot.xPos * 3 + 900,
              left: visitedSpot.yPos * 3 + 700,
              backgroundColor: "red",
              height: 7,
              width: 7,
            }}
          ></div>
        ))}
        {current.map((knot, index) => (
          <div
            style={{
              position: "absolute",
              top: knot.xPos * 3 + 900,
              left: knot.yPos * 3 + 700,
              backgroundColor: "green",
              borderRadius: 100,
              height: 7,
              width: 7,
              borderStyle: "solid",
              borderWidth: 1,
            }}
          ></div>
        ))}
      </div>
    );
  }
  return <div>Loading...</div>;
};
