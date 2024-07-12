import React, {useEffect, useMemo, useRef, useState} from 'react'
import "./Board.sass";

import { Stage, Layer, Line, Group } from "react-konva";
import Tank from "../tank/Tank";
import {useGrid} from "../../contexts/GridContext";
import {useTanks} from "../../contexts/TanksContext";
import {useMutation, useQueryClient} from "react-query";
import {setTankPos} from "../../actions/tankActions";
import {Position} from "types/position";

const Board = () => {
  const queryClient = useQueryClient();
  const {boardSize, gridSize} = useGrid();
  const {tanks} = useTanks();

  const setPositionMutation = useMutation({
    mutationFn: ({userId, newPosition}: {userId: string, newPosition: Position}) => setTankPos(userId, newPosition),
    options: {
      retry: 3,
        onSuccess: (() => queryClient.invalidateQueries("tanks")),
    }
  });

  const divRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  useEffect(() => (
    window.addEventListener("resize", () => {
      if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
        console.debug("new", divRef.current.offsetWidth, divRef.current.offsetHeight);
        setDimensions({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight
        })
      }
    })
  ), [])

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      console.debug("new", divRef.current.offsetWidth, divRef.current.offsetHeight);
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight
      })
    }
  }, [divRef?.current?.offsetWidth, divRef?.current?.offsetHeight]);

  const lines = useMemo(
    () => {
      const lines = [];

      for (let x = 0; x <= boardSize.width; x++) {
        lines.push(
          <Line
            key={`vertical-${x}`}
            stroke={"black"}
            strokeWidth={2}
            points={[
              gridSize * x, 0,
              gridSize * x, boardSize.height * gridSize,
            ]}
          />,
        )
      }

      for (let y = 0; y <= boardSize.height; y++) {
        lines.push(
          <Line
            key={`horizontal-${y}`}
            stroke={"black"}
            strokeWidth={2}
            points={[
              0, gridSize * y,
              boardSize.width * gridSize, gridSize * y,
            ]}
          />,
        )
      }

      return lines;
    },
    [boardSize.width, boardSize.height, gridSize]
  );

  return (
    <div className={"stage-container"} ref={divRef}>
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer
          x={(dimensions.width / 2) - (boardSize.width * gridSize / 2)}
          y={(dimensions.height / 2) - (boardSize.height * gridSize / 2)}
        >
          <Group>
            {lines}
          </Group>

          <Group>
            {
              tanks.map((tank) => (
                <Tank
                  key={tank.userId}
                  tank={tank}
                  setPosition={(userId, newPosition) => {
                    setPositionMutation.mutate({userId, newPosition})
                  }}
                />
              ))
            }
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default Board
