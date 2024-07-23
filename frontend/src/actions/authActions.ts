import axios from "./index";

const axiosAuth = axios.create({
	baseURL: "/api/auth",
});

export const login = async (data, remember=false) => {
	return await axiosAuth.post(
		"/token",
		data,
		{
			params: {
				remember: remember || undefined
			}
		}
	).then(({ data }) => {
		axios.interceptors.request.use(
			(config) => {
				config.headers.authorization = `Bearer ${data.access_token}`;
				return config;
			},
			(error) => Promise.reject(error),
		)
	})
};

export const logout = async () => {
	return await axiosAuth.post(
		"/logout"
	).then((res) =>
		window.location.href = "/login"
	)
}
