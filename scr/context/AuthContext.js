import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { createContext, useState, useEffect } from "react";
import { instance } from "../../config";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
import { ToastSuccessMessage } from "../components/ToastSuccessMessage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { device_token } from "../api";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken] = useState();
	const [authPhone, setAuthphone] = useState();
	const [userId, setUserId] = useState();

	//SET
	const TokenStore = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};
	const PhoneStore = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};
	const RefreshTokenStore = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};
	const UserIDStore = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const Login = async (phone_number, password) => {
		if (phone_number === "" || password === "") {
			ToastErrorMessage("Tous les champs sont obligatoires!");
		} else {
			setIsLoading(true);
			await instance
				.post(`token`, { phone_number, password })
				.then((res) => {
					setUserToken(res.data.access);
					RefreshTokenStore("refreshToken", res.data.refresh);
					TokenStore("authToken", res.data.access);
					setAuthphone(phone_number);
					PhoneStore("Phone", JSON.stringify(phone_number));
					const { user_id } = jwtDecode(res.data.access, { playload: true });
					setUserId(user_id);
					UserIDStore("UserId", user_id);
					setIsLoading(false);
				})
				.catch((e) => {
					if (e.response?.status === 404) {
						ToastErrorMessage("Paramétres de connexion érronés.");
					}
				})
				.finally(() => {
					setIsLoading(false);
					// axios.interceptors.request.eject(instance);
				});
		}
	};
	const signOut = async () => {
		await instance
			.post("logout")
			.then(() => {
				console.log("Successfully logout !");
			})
			.catch((error) => {
				// Handle errors
				console.error(error);
			});
	};
	const Logout = async () => {
		setIsLoading(true);
		setUserToken(null);
		setIsLoading(false);
		setAuthphone(null);
		setUserId(null);
		await SecureStore.deleteItemAsync("UserId");
		await SecureStore.deleteItemAsync("authToken");
		await SecureStore.deleteItemAsync("Phone");
		signOut();
		ToastSuccessMessage("Vous êtes déconnecté.e!");
	};
	const [expoPushToken, setExpoPushToken] = useState([]);
	const isLoggedIn = async () => {
		try {
			setIsLoading(true);
			let phoneStore = await SecureStore.getItemAsync("Phone");
			let tokenStore = await SecureStore.getItemAsync("authToken");
			let idstore = await SecureStore.getItemAsync("UserId");
			if (phoneStore) {
				setUserToken(tokenStore);
				setAuthphone(JSON.parse(phoneStore));
				setUserId(idstore);
			}
		} catch (error) {
			console.log(`isLoggedIn error ${error}`);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		isLoggedIn();
		console.log("Registering for push notifications...");
		registerForPushNotificationsAsync()
			.then((token) => {
				setExpoPushToken(token);
				async function fetchData() {
					await instance
						.post("/api/device-token", {
							token_notification: token,
						})
						.then(() => {
							console.log("Token register successfully");
						})
						.catch((error) => {
							if (error.response?.status === 400) {
								console.log("Device token already exist!");
							}
							console.log(error);
						});
				}
				fetchData();
			})
			.catch((err) => console.log(err));
	}, []);

	async function registerForPushNotificationsAsync() {
		let token;
		let projectId = "9e700bb9-2a97-4cf1-85a0-d034eebf6f8a";
		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		if (Device.isDevice) {
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			// Learn more about projectId:
			// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId: projectId,
				})
			).data;
		} else {
			alert("Must use physical device for Push Notifications");
		}

		return token;
	}

	const sendNotification = async (body) => {
		console.log("Sending push notification...");
		await instance.get(`device-token`).then(async function (response) {
			let result = [];
			response.data.map((item) => {
				result.push(item?.token_notification);
			});
			const ListTokenReceiver = result.filter(
				(expoToken) => expoToken !== expoPushToken
			);

			const message = {
				to: ListTokenReceiver,
				sound: "default",
				title: "NETIC",
				body,
			};
			await fetch("https://exp.host/--/api/v2/push/send", {
				method: "POST",
				headers: {
					host: "exp.host",
					accept: "application/json",
					"accept-encoding": "gzip, deflate",
					"content-type": "application/json",
				},
				body: JSON.stringify(message),
			});
		});
	};

	return (
		<AuthContext.Provider
			value={{
				Login,
				Logout,
				isLoading,
				userToken,
				authPhone,
				userId,
				sendNotification,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
