import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { ToastErrorMessage } from "./scr/components/ToastErrorMessage";
import { ToastInternetErrorMessage } from "./scr/components/ToastInternetErrorMessage";
import * as Network from "expo-network";

const API_URL = "https://talon397.hostpapavps.net/";
export const instance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	timeout: 5000,
});

instance.interceptors.request.use(
	async (config) => {
		const authToken = await SecureStore.getItemAsync("authToken");
		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

async function refreshToken() {
	const refresh = await SecureStore.getItemAsync("refreshToken");
	if (refresh) {
		const response = instance.post(`token/refresh`, {
			refresh: await SecureStore.getItemAsync("refreshToken"),
		});
		access = (await response).data.access;
		return access;
	}
}

// Response interceptor for API calls
instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		const { isInternetReachable } = await Network.getNetworkStateAsync();
		if (error.response?.status === 401) {
			if (error.config._retry) {
				return Promise.reject(error);
			}
			originalRequest._retry = true;
			const newAccessToken = await refreshToken();
			error.config.headers.Authorization = `Bearer  ${newAccessToken}`;
			const requestResult = await axios.request(error.config);
			return requestResult;
			// return await instance(originalRequest);
		} else if (error.response?.status === 403) {
			ToastErrorMessage("Pas autorisé.e");
		} else if (error.response?.status === 404) {
			ToastErrorMessage("Non trouvé");
		} else if (error.response?.status === 400) {
			// ToastErrorMessage("Mauvaise requête");
			console.log("Mauvaise requête");
		} else if (!isInternetReachable) {
			ToastInternetErrorMessage("Vérifier votre connexion internet.");
		} else if (error.message === "Network Error" && !error.response) {
			// console.log(error.config)
			ToastErrorMessage("Network Error");
		} else {
			console.log(error);
		}
		return Promise.reject(error);
	}
);

export const generateOTPCode = () => {
	const randomNum = Math.random() * 9000;
	return Math.floor(1000 + randomNum);
};
export const PROJECT_ID = "9e700bb9-2a97-4cf1-85a0-d034eebf6f8a";
export const API_KEY = "AIzaSyDx8pI33IiRhha1lx6VlUMdlej5vA_ThEc";
