import { Position } from "./position";

export interface Tank {
	userId: string,

	hearts: number,
	actionPoints: number,
	range: number,

	position: Position,
}
