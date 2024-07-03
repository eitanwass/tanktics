export enum GameMode {
	Regular = "regular",
}

export interface Room {
	roomId: string,

	name: string,

	gameSettings: {
		gameMode: GameMode,
		maxPlayers: number,
		isPublic: boolean,
		allowedPlayers?: string[],
	},
}
