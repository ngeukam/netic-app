import { View, Text, Image, Platform, Animated } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, CreatePublication } from "../screens";
import { COLORS, icons } from "../constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const screenOptions = {
	tabBarShowLabel: false,
	headerShown: false,
	tabBarStyle: {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		elevation: 0,
		borderTopRightRadius: 13,
		borderTopLeftRadius: 13,
		height: Platform.OS === "ios" ? 90 : 60,
		backgroundColor: COLORS.gray,
		borderColor: COLORS.white,
	},
	tabBarHideOnKeyboard: true,
};

const StackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Create" component={CreatePublication} />
		</Stack.Navigator>
	);
};

const BottomTabNavigation = () => {
	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen
				name="DrawerHome"
				component={StackNavigator}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Image
								source={focused ? icons.home : icons.homeOutline}
								resizeMode="contain"
								style={{
									height: 26,
									width: 26,
									tintColor: focused ? COLORS.red : COLORS.black,
									marginRight: 60,
								}}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Create"
				component={CreatePublication}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: focused ? COLORS.red : COLORS.blue,
									height: Platform.OS === "ios" ? 60 : 50,
									width: Platform.OS === "ios" ? 90 : 80,
									// top: Platform.OS === "ios" ? -20 : -30,
									borderRadius: Platform.OS === "ios" ? 30 : 20,
									borderWidth: 2,
									borderColor: COLORS.white,
								}}
							>
								<Image
									source={icons.plus}
									resizeMode="contain"
									style={{
										height: 26,
										width: 26,
										tintColor: COLORS.white,
									}}
								/>
							</View>
						);
					},
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Image
								source={focused ? icons.user : icons.userOutline}
								resizeMode="contain"
								style={{
									height: 26,
									width: 26,
									tintColor: focused ? COLORS.red : COLORS.black,
									marginLeft: 60,
								}}
							/>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigation;
