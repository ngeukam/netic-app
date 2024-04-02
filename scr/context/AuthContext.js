import * as SecureStore from "expo-secure-store";
import React, { createContext, useState, useEffect } from "react";
import { instance } from "../../config";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [authPhone, setAuthphone] = useState(null);
	const [userId, setUserId] = useState(null);
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
					TokenStore("authToken", res.data.access);
					PhoneStore("Phone", JSON.stringify(phone_number));
					setUserToken(res.data.access);
					RefreshTokenStore("refreshToken", res.data.refresh);
					const { user_id } = jwtDecode(res.data.access, { playload: true });
					UserIDStore("UserId", user_id);
					setIsLoading(false);
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
	const Logout = async () => {
		setIsLoading(true);
		setUserToken(null);
		setIsLoading(false);
		await SecureStore.deleteItemAsync("UserId");
		await SecureStore.deleteItemAsync("authToken");
		await SecureStore.deleteItemAsync("Phone");
		signOut();
	};
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
	}, []);
	return (
		<AuthContext.Provider
			value={{ Login, Logout, isLoading, userToken, authPhone, userId }}
		>
			{children}
		</AuthContext.Provider>
	);
};
