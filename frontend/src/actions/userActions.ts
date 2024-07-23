import axios from "./index";
import {User} from "../types/user";

const axiosUsers = axios.create({
	baseURL: "/api/user",
});