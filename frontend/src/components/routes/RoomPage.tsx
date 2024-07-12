import React from "react";
import _ from "lodash";
import {useQuery} from "react-query";
import {getRoomById} from "../../actions/roomActions";
import {useSearchParams} from "react-router-dom";
import {TanksProvider} from "../../contexts/TanksContext";
import Board from "../board/Board";
import {GridProvider} from "../../contexts/GridContext";
import Title from "../Title";


const RoomPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const roomId = searchParams.get("roomId");

	const {data: room} = useQuery(
		["room", roomId],
		() => Promise.all([
			getRoomById(roomId!),
		]),
		{
			refetchInterval: false,
			enabled: !_.isNil(roomId),
		}
	);

	return (
		<GridProvider>
			<TanksProvider roomId={roomId}>
				<Title>
					{ room?.name ?? "Room not found" }
				</Title>
				<Board />
			</TanksProvider>
		</GridProvider>
	);
};

export default RoomPage;
