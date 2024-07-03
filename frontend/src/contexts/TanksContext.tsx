import React, {createContext, useContext} from "react";
import _ from "lodash";
import {Tank} from "../types/tank";
import {useQuery} from "react-query";
import {getTanks} from "../actions/tankActions";

export type TanksContextType = {
	tanks: Tank[]
}

interface TanksProviderProps {
	roomId?: string,
	children: React.ReactElement
}

const TanksContext = createContext<TanksContextType>({
	tanks: []
});

export const TanksProvider: React.FC<TanksProviderProps> = ({roomId, children}) => {
	const {data: tanks} = useQuery(
		["tanks"],
		() => getTanks(roomId!),
		{
			initialData: () => [],
			enabled: !_.isNil(roomId),
		}
	);

	return (
		<TanksContext.Provider value={{tanks: tanks}}>
		{children}
		</TanksContext.Provider>
	);
};

export const useTanks = () => useContext(TanksContext);
