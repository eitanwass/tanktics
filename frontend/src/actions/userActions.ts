import axios from "axios";
import {User} from "../types/user";

const axiosUsers = axios.create({
	baseURL: "/api/user",
});