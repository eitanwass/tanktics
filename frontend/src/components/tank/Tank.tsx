import React, {FC, useCallback, useMemo} from "react";
import {Rect} from "react-konva";
import {useGrid} from "../../contexts/GridContext";
import Konva from "konva";
import Shape = Konva.Shape;
import Stage = Konva.Stage;
import {Position} from "../../types/position";
import {Tank as TankType} from "../../types/tank";

type TankProps = {
	tank: TankType,
	setPosition: (userId: string, position: Position) => void;
}


const Tank: FC<TankProps> = ({
	tank,
	setPosition,
}) => {
	const { gridSize, boardSize } = useGrid();

	const tankSize = useMemo(
		() => (2 * gridSize / 3),
		[gridSize]
	);

	const getTargetPosition = useCallback(
		(target: Shape | Stage) => {
			let targetX = target.x();
			let targetY = target.y();

			console.debug(targetX, targetY);

			if (targetX > (boardSize.width - 1) * gridSize) {
				targetX = (boardSize.width - 1) * gridSize;
			}
			else if (targetX < 0) {
				targetX = 0;
			}

			console.debug(boardSize.height * gridSize);

			if (targetY > (boardSize.height - 1) * gridSize) {
				targetY = (boardSize.height - 1) * gridSize;
			}
			else if (targetY < 0) {
				targetY = 0;
			}

			return {
				x: Math.round(targetX / gridSize) * gridSize,
				y: Math.round(targetY / gridSize) * gridSize
			};
		},
		[gridSize, boardSize]
	)
	return (
		<Rect
			x={tank.position.x * gridSize}
			y={tank.position.y * gridSize}
			width={tankSize}
			height={tankSize}
			offsetX={-(gridSize - tankSize) / 2}
			offsetY={-(gridSize - tankSize) / 2}
			fill={"rgba(0.2, 0.2, 0.2, 1)"}
			onDragEnd={(e) => {
				const targetPos = getTargetPosition(e.target);
				const newBoardCoordinates: Position = {x: targetPos.x / gridSize, y: targetPos.y / gridSize}
				void setPosition(tank.userId, newBoardCoordinates);
				e.target.to({...targetPos});
			}}
			draggable
		/>
	)
};

export default Tank;
