import { View, Text, Image, Platform, Animated } from "react-native";
import React from "react";
import {
	createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { Home, Message, Profile, CreatePublication, Search } from "../screens";
import { COLORS, icons } from "../constants";
import { Ionicons } from "@expo/vector-icons";
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
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
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
								}}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Ionicons
								name={focused ? "search" : "search"}
								size={26}
								color={focused ? COLORS.red : COLORS.black}
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
									backgroundColor: COLORS.red,
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
				name="Message"
				component={Message}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Image
								source={focused ? icons.bell : icons.bellOutline}
								resizeMode="contain"
								style={{
									height: 26,
									width: 26,
									tintColor: focused ? COLORS.red : COLORS.black,
								}}
							/>
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
