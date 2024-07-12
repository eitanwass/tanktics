import {User} from "./user";

export enum GameMode {
	Regular = "regular",
}

export interface Room {
	roomId: string,

	name: string,
	players: User[],
	gameSettings: {
		gameMode: GameMode,
		maxPlayers: number,
		isPublic: boolean,
		allowedPlayers?: string[],
	},
}
