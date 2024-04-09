import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/connexions/Login";
import Register from "../screens/connexions/Register";
import Otp from "../screens/connexions/Otp";
import Phone from "../screens/connexions/Phone";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
			<Stack.Navigator
			screenOptions={{
				headerShown: false,
				presentation: "modal",
				animationTypeForReplace: "push",
				animation: "slide_from_right",
			}}
			initialRouteName="Login"
			>
				<Stack.Screen name="Phone" component={Phone} />
				<Stack.Screen name="Otp" component={Otp} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
	);
};

export default AuthStack;
