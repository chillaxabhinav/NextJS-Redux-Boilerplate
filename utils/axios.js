import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const instance = axios.create({
	baseURL: publicRuntimeConfig.API_URL,
});

instance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		return Promise.reject(error);
	},
);

export default instance;
