import axios from "axios";
import {Room} from "../types/room";

const axiosRooms = axios.create({
	baseURL: "/api/room",
});

// TODO: Add interceptor with userId to header

export const getAllRooms = async (): Promise<Room[]> =>
	(await axiosRooms.get<Room[]>("/all")).data;

export const getRoomById = async (roomId: string): Promise<Room | undefined> =>
	(await axiosRooms.get<Room>(`/${roomId}`)).data;
