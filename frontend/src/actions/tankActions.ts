import axios from "./index";
import {Tank} from "../types/tank";
import {Position} from "../types/position";

const axiosTanks = axios.create({
	baseURL: "/api/tanks",
});

// TODO: Add interceptor with userId to header

export const getTanks = async (roomId: string): Promise<Tank[] | undefined> =>
	(await axiosTanks.get<Tank[]>(`${roomId}/all`)).data;

export const setTankPos = async (userId: string, position: Position): Promise<void> =>
	await axiosTanks.post("position", {userId: userId, position: position});
