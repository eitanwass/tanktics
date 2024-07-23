import React from "react";
import {useQuery} from "react-query";
import {getAllRooms} from "../../actions/roomActions";
import Grid from '@mui/material/Grid';
import {Favorite, PlayCircleOutline, Share} from "@mui/icons-material";
import _ from "lodash";
import {Card, CardHeader, CardContent, CardActions, IconButton} from "@mui/material";
import {Room} from "../../types/room";

import "./RoomBrowserPage.sass";
import { useNavigate, createSearchParams } from "react-router-dom";

const RoomBrowserPage = () => {
	const navigate = useNavigate();
	const {data: allRooms} = useQuery(
		["allRooms"],
		() => getAllRooms(),
	);

	return (
		<div className={"room-browser-page"}>
			<Grid container spacing={2}>
				{
					_.map(allRooms ?? [], (room: Room) => (
						<Grid xs={2}>
							<Card>
								<CardHeader
									title={room.name}
									subheader={`x/${room.gameSettings.maxPlayers}`}
								/>
								<CardContent>
									Extra data here.
									Number of rounds, living players, etc
								</CardContent>
								<CardActions disableSpacing>
									<IconButton
										id={"favorite-button"}
										aria-label={"add to favorites"}>
										<Favorite />
									</IconButton>
									<IconButton
										id={"share-button"}
										aria-label={"share"}
									>
										<Share />
									</IconButton>
									<IconButton
										id={"join-button"}
										aria-label={"join"}
										onClick={() => {
											navigate({
												pathname: "/room",
												search: createSearchParams({roomId: room.roomId}).toString(),
											});
										}}
									>
										<PlayCircleOutline />
									</IconButton>
								</CardActions>
							</Card>
						</Grid>
					))
				}
			</Grid>
		</div>
	)

};

export default RoomBrowserPage;
