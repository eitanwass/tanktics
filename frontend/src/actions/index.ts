import axios from "axios";
import {redirect} from "react-router-dom";

const _createAxios = axios.create;

axios.create = (conf) => {
  const instance = _createAxios(conf);

  instance.interceptors.response.use(
		(value) => value,
		(err) => {
			if (err.response?.status === 401){
				window.location.href = "/login";
			}
			return Promise.reject(err);
		}
	);
  return instance;
};

export default axios;
