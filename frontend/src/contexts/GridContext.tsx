import React, {createContext, useContext} from "react";

export type GridContextType = {
	boardSize: {width: number, height: number};
	gridSize: number;
}

const GridContext = createContext<GridContextType>({
	boardSize: {width: 0, height: 0},
	gridSize: 0,
});

export const GridProvider = ({children}) => {
	const boardSize = {width: 10, height: 10};
	const gridSize = 64;

	return (
		<GridContext.Provider value={{
			boardSize,
			gridSize,
		}}>
		{children}
		</GridContext.Provider>
	);
};

export const useGrid = () => useContext(GridContext);
