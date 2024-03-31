import * as SecureStore from "expo-secure-store";
import React, { createContext, useState, useEffect } from "react";
import { instance } from "../../config";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [authPhone, setAuthphone] = useState(null);
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

	// DEL
	const DeleteKey = async (key) => {
		await SecureStore.deleteItemAsync(key);
	};
	// const access_token = JSON.stringify(GetRefreshToken("refreshToken"));
	// console.log('token',access_token);

	const Login = async (phone_number, password) => {
		if (phone_number === "" || password === "") {
			ToastErrorMessage("Tous les champs sont obligatoires!");
		} else {
			setIsLoading(true);
			await instance
				.post(`token`, { phone_number, password })
				.then((res) => {
					TokenStore("authToken", res.data.access);
					PhoneStore("Phone", JSON.stringify(phone_number));
					setUserToken(res.data.access);
					RefreshTokenStore("refreshToken", res.data.refresh);
					setIsLoading(false);
					// navigation.navigate("Main");
				})
				.finally(() => {
					setIsLoading(false);
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
	const Logout = () => {
		setIsLoading(true);
		DeleteKey("authToken");
		DeleteKey("Phone");
		DeleteKey("Iduser");
		setUserToken(null);
		setIsLoading(false);
		signOut();
	};
	const isLoggedIn = async () => {
		try {
			setIsLoading(true);
			let phoneStore = await SecureStore.getItemAsync("Phone");
			let tokenStore = await SecureStore.getItemAsync("authToken");
			if (phoneStore) {
				setUserToken(tokenStore);
				setAuthphone(JSON.parse(phoneStore));
			}
		} catch (error) {
			console.log(`isLoggedIn error ${error}`);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		isLoggedIn();
	}, []);
	return (
		<AuthContext.Provider
			value={{ Login, Logout, isLoading, userToken, authPhone }}
		>
			{children}
		</AuthContext.Provider>
	);
};
