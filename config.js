import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ToastErrorMessage } from "./scr/components/ToastErrorMessage";
import { ToastInternetErrorMessage } from "./scr/components/ToastInternetErrorMessage";
import * as Network from "expo-network";

const localhost = Platform.OS === "android" ? "192.168.43.128" : "127.0.0.1";
export const instance = axios.create({
	baseURL: `http://${localhost}:8001/api/v1/`,
});
instance.interceptors.request.use(
	async (config) => {
		const authToken = await SecureStore.getItemAsync("authToken");
		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}
		// config.baseURL = `http://${localhost}:8000/api/v1/`;
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

async function refreshToken() {
	const refresh = await SecureStore.getItemAsync("refreshToken");
	if (refresh) {
		const response = instance.post(`token/refresh/`, {
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
		console.log(isInternetReachable);
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const newAccessToken = await refreshToken();
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer  ${newAccessToken}`;
			return await instance(originalRequest);
		} else if (error.response?.status === 403) {
			ToastErrorMessage("Pas autorisé.e");
		} else if (error.response?.status === 404) {
			ToastErrorMessage("Non trouvé");
		} else if (error.response?.status === 400) {
			ToastErrorMessage("Mauvaise requête");
		} else if (!isInternetReachable) {
			ToastInternetErrorMessage("Vérifier votre connexion internet.");
		} else {
			ToastErrorMessage("Une erreur s'est produite");
		}
		return Promise.reject(error);
	}
);

export const generateOTPCode = () => {
	const randomNum = Math.random() * 9000;
	return Math.floor(1000 + randomNum);
};
export const PROJECT_ID = "9e700bb9-2a97-4cf1-85a0-d034eebf6f8a";
