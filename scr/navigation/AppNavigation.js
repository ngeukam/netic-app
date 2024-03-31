import React, { useContext } from "react";
import { View } from "react-native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import LottieView from "lottie-react-native";
import { images } from "../constants";
import { NavigationContainer } from "@react-navigation/native";


const AppNavigation = () => {
	const { isLoading, userToken } = useContext(AuthContext);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<LottieView
					style={{
						width: 300,
						height: 180,
					}}
					source={images.delivery_anim}
					autoPlay
					loop
				/>
			</View>
		);
	} else {
		return (
			<NavigationContainer>
				{userToken !== null ? (
					<AppStack />
				) : (
					<AuthStack />
				)}
			</NavigationContainer>
		);
	}
};

export default AppNavigation;
