import {useLocation} from "react-router";

const useSearchParams = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const paramsObj = {};

  for (const [key, value] of queryParams) {
    paramsObj[key] = value;
  }

  return paramsObj;
};

export default useSearchParams;
